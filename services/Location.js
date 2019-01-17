import { AsyncStorage} from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { prevAuthCall, endpointCall } from '../services/Rest';
import Urls from '../constants/Urls';


export class LocationSender {
    constructor(cb) {
        this.cb = cb;
        this.watchId = undefined;
    }

    watchId = undefined;

    sendLocation(cb){
        AsyncStorage.getItem('profile')
        .then(profileString => {
            profile = JSON.stringify(profileString);
            this.watchID = navigator.geolocation.watchPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    console.log(latitude);
                    console.log(longitude);
                    endpointCall(cb, Urls.location, {longitude:longitude, latitude:latitude});
                },
                error => console.log(error),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        }).catch(error => console.log(error))
    }

    stopSendLocation(cb){
        navigator.geolocation.clearWatch(this.watchID);
    }
}

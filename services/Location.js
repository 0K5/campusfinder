import { AsyncStorage} from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { prevAuthCall, endpointCall } from '../services/Rest';
import Urls from '../constants/Urls';


export class LocationSender {
    constructor() {
        this.watchId = undefined;
    }

    sendLocation(cb){
        let locationSentCallback = cb
        AsyncStorage.getItem('profile')
        .then(profileString => {
            profile = JSON.parse(profileString);
            this.watchID = navigator.geolocation.watchPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    endpointCall(locationSentCallback, Urls.location, {longitude:longitude, latitude:latitude});
                },
                error => console.log(error),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        }).catch(error => console.log(error))
    }

    stopSendLocation(){
        if(this.watchID){
            navigator.geolocation.clearWatch(this.watchID);
        }
    }
}

export class LocationReceiver {
    //trackedId is primary key value of item or profile to track (for profile its email, for building/room its name)
    constructor(email) {
        this.email = email;
        this.fetcher = undefined;
    }

    receiveLocation(cb){
        let locationReceivedCallback = cb
        locRec = this;
        AsyncStorage.getItem('profile')
        .then(profileString => {
            locRec.fetcher = (searchText) => {
               return setInterval(function () {
                   endpointCall(locationReceivedCallback, Urls.tracking, {tracked: locRec.email})
               }, 2000);
            }
        }).catch(error => console.log(error))
    }

    stopReceiveLocation(){
        clearInterval(this.fetcher);
    }
}

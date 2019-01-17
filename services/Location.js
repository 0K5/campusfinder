import { AsyncStorage} from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { prevAuthCall, endpointCall } from '../services/Rest';
import Urls from '../constants/Urls';


export class LocationSender {
    constructor() {
        this.watchId = undefined;
    }

    sendLocation(){
        locSen = this;
        let responseActiveTracking = function(response, data){
            endpointCall(responseActiveTracking, Urls.trackingActive, data);
        }
        let requestActiveTracking = function(response, data){
            if (response && typeof response === 'object' && !response.hasOwnProperty("errorcode")) {
                endpointCall(responseActiveTracking, Urls.trackingActive, data);
            }else{
                return endpointCall(loadedRooms, Urls.room, {})
            }
        }
        AsyncStorage.getItem('profile')
        .then(profileString => {
            profile = JSON.parse(profileString);
            this.watchID = navigator.geolocation.watchPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    console.log(latitude);
                    console.log(longitude);
                    endpointCall(requestActiveTracking, Urls.location, {longitude:longitude, latitude:latitude});
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
    constructor(cb, trackedId) {
        this.cb = cb;
        this.trackedId = trackedId;
        this.fetcher = undefined;
    }

    receiveLocation(cb){
        locRec = this;
        AsyncStorage.getItem('profile')
        .then(profileString => {
            this.fetcher = (searchText) => {
               return setTimeout(function () {
                   endpointCall(locRec.cb, Urls.tracking, {tracked: locRec.trackedId})
               }, 2000);
            }
        }).catch(error => console.log(error))
    }

    stopReceiveLocation(cb){
         this.isFetch = false;
    }
}

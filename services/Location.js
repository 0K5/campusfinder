import { AsyncStorage, Alert} from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { prevAuthCall, endpointCall } from '../services/Rest';
import Urls from '../constants/Urls';


export class LocationSender {
    constructor() {
        this.fetcher = undefined;
    }

    sendLocation(cb){
        this.cb = cb
        let sentLocation = function(response, data){
            if(response && !response.hasOwnProperty("errorcode") && !response.hasOwnProperty("type")){
                locSen.cb(response);
            }else if(response && response.hasOwnProperty("type")){
                locSen.stopSendLocation();
                Alert.alert(
                    'Tracking ended',
                    ''+response.message,
                )
                locSen.cb(response);
            }else if(response && response.hasOwnProperty("errorcode")){
                locSen.stopSendLocation();
                Alert.alert(
                    'Tracking aborted',
                    'Cause: ' + response.message,
                )
            }else{
                 Alert.alert(
                        'Tracking aborted',
                        'Cause: ' + response.message,
                    )
                locSen.stopSendLocation();
            }
        }
        locSen = this;
        this.fetcher = setInterval(() => {
            navigator.geolocation.watchPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    endpointCall(sentLocation, Urls.location, {longitude:longitude, latitude:latitude});
                },
                error => console.log(error),
                { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }
            );
        }, 2000);
    }

    stopSendLocation(){
        clearInterval(this.fetcher);
    }
}

export class LocationReceiver {
    //trackedId is primary key value of item or profile to track (for profile its email, for building/room its name)
    constructor() {
        this.fetcher = undefined;
    }

    receiveLocation(cb, email){
        this.cb = cb
        this.email = email
        locRec = this;
        let gotLocation = function(response, data){
            if(response && !response.hasOwnProperty("errorcode") && !response.hasOwnProperty("type")){
                trackedName = response.trackedLocation.profile.email;
                trackedLocation = {
                    "longitude" : parseFloat(response.trackedLocation.longitude),
                    "latitude" : parseFloat(response.trackedLocation.latitude)
                }
                AsyncStorage.setItem(email, JSON.stringify(trackedLocation))
                .then(email => {
                    locRec.cb(response);
                })
            }else if(response && response.hasOwnProperty("type")){
                locRec.stopReceiveLocation();
                Alert.alert(
                    'Tracking ended',
                    ''+response.message,
                )
                AsyncStorage.setItem(email,"done")
                .then(() => {
                    locRec.cb(response);
                })
            }else if(response && response.hasOwnProperty("errorcode")){
                locRec.cb(response);
            }else{
                locRec.stopReceiveLocation();
            }

        }
        this.fetcher = setInterval(() => {
            endpointCall(gotLocation, Urls.tracking, {tracked: this.email})
        }, 2000);
    }

    stopReceiveLocation(){
        clearInterval(this.fetcher);
    }
}

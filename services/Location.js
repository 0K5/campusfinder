import { AsyncStorage, Alert} from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { prevAuthCall, endpointCall } from '../services/Rest';
import Urls from '../constants/Urls';


export class LocationActivator {
    //trackedId is primary key value of item or profile to track (for profile its email, for building/room its name)
    constructor(map) {
        this.receiver = undefined;
        this.map = map;
    }

    activateLocation(cb, email){
        console.log("LOCATIONACTIVATOR ACTIVATELOGIN");
        this.cb = cb;
        this.email = email;
        this.map.trackUser(this.email);
        isTracking = true;
        let locRec = this;
        let sentLoc = (response, data) =>{
            return;
        }
        this.sendLocation(sentLoc);
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
                locRec.cb(response);
                endpointCall(sentLoc, Urls.trackingAbort, {'receiver':email});
                AsyncStorage.setItem(email,"done")
                .then(() => {
                    Alert.alert(
                        'Tracking ended',
                        ''+response.message,
                    )
                })
            }else if(response && response.hasOwnProperty("errorcode")){
                locRec.cb(response);
            }else{
                locRec.stopReceiveLocation();
                endpointCall(sentLoc, Urls.trackingAbort, {'receiver':email});
            }
        }
        let firstFetch = Date.now();
        let startReceiver = (response,data) => {
            let receiveTime = (Date.now() - firstFetch) * 20;
            console.log("TRACKING INTERVALLTIME: " + receiveTime);
            gotLocation(response,data);
            let receiveInterval = (Date.now() - firstFetch) + ((Date.now() - firstFetch)/2);
            this.receiver = setInterval(() => {
                endpointCall(gotLocation, Urls.tracking, {tracked: locRec.email})
            }, receiveInterval);
        }
        console.log("TRACKING ACTIVATED");
        endpointCall(startReceiver, Urls.tracking, {tracked: this.email})
    }

    stopReceiveLocation(){
        this.stopSendLocation();
        clearInterval(this.receiver);
    }

    sendLocation(cb){
        this.cb = cb
        let locSen = this;
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
                    'Cause: ' + JSON.stringify(response),
                )
                locSen.cb(response);
            }else{
                locSen.stopSendLocation();
                Alert.alert(
                    'Tracking aborted',
                    'Cause: ' + JSON.stringify(response),
                )
                locSen.cb(response);
            }
        }
        locSen = this;
        if(!locSen.isSending){
            locSen.isSending = true;
            this.sender = setInterval(() => {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const { latitude, longitude } = position.coords;
                        endpointCall(sentLocation, Urls.location, {longitude:longitude, latitude:latitude});
                    },
                    error => console.log(error),
                    { maximumAge: 3000, timeout: 6000, enableHighAccuracy: true }
                );
            }, 2000);
        }
    }

    stopSendLocation(){
        clearInterval(this.sender);
        this.isSending = false;
    }
}

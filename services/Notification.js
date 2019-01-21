import { Notifications } from 'expo';
import { AsyncStorage, Alert } from 'react-native';
import { prevAuthCall, endpointCall } from '../services/Rest';
import { LocationActivator } from '../services/Location';
import Urls from '../constants/Urls';

export class NotificationReceiver{
    constructor(isTracking, isNotification, pushToken) {
        this.isTracking = isTracking;
        this.hasPush = pushToken && pushToken != "" ? true : false;
        if(isNotification && this.isTracking){
            this._locActivator = new LocationActivator()
        }
        if(isNotification && this.hasPush){
            this._notifListener = this._handleTrackingNotification();
        }else if(isNotification && !this.hasPush){
            this._notifListener = this._handleTrackingNotification();
        }
        this.isTracked = false;
        this.tracker = "";
    }

    sentTrackingAnswer(isAllowed){
        let sentLocation = function(response, data){
            if(response){
                console.log(JSON.stringify(response));
            }
        }
        let trackRequestResponse = function(response, data){
            if (response && typeof response === 'object' && !response.hasOwnProperty("errorcode") && isAllowed === true) {
                return Alert.alert(
                    "Tracking startet",
                    "You're now tracked by "+response.sender
                )
            }
        }
        endpointCall(trackRequestResponse, Urls.trackingResponse, {isAllowed:isAllowed});
    }

    trackingRequestAlert(sender){
        notRec = this;
        let empty = (response,data) => {
            console.log(JSON.stringify(response));
        }
        let sentTrackingAnswer = function(isAllowed){
            let receivedLoc = (response, data) =>{
                console.log("RECEIVING LOCATION " + JSON.stringify(response))
            }
            let trackRequestResponse = function(response, data){
                if (response && typeof response === 'object' && !response.hasOwnProperty("errorcode")) {
                    return Alert.alert(
                        "Tracking startet",
                        "You're now tracked by "+response.sender.username
                    )
                }
            }
            if(isAllowed && notRec._locActivator){
                this.isTracked = true;
                this.tracker = sender;
                notRec._locActivator.activateLocation(receivedLoc,sender);
                return endpointCall(trackRequestResponse, Urls.trackingResponse, {receiver:sender, confirm:isAllowed});
            }
        };
        Alert.alert(
            'Tracking Startet',
            ''+sender+' wants to track you on the campus',
            [
                {text: 'Deny', onPress: () => sentTrackingAnswer(false), style: 'cancel'},
                {text: 'Allow', onPress: () => sentTrackingAnswer(true)},
            ],
            { cancelable: false }
        );
    };

    trackingResponseAlert(sender){
        let receivedLoc = (response, data) =>{
            console.log("RECEIVING LOCATION " + JSON.stringify(response))
        }
        this._locActivator.activateLocation(receivedLoc,sender);
        return Alert.alert(
            'Tracking request accepted',
            "You're now tracking "+sender
        )
    }

    trackingAbortedAlert(sender){
        this.isTracked = false;
        this.tracker = "";
        this._locActivator.stopReceiveLocation();
    }

    _handleTrackingNotification = () => {
        let notRecH = this;
        console.log("NOTIFICATIONLISTENER ACTIVE")
        this.notifFetcher = setInterval(() => {
            let trackNotif = function(response, data){
                console.log("NOTIFICATIONLISTENER: " + JSON.stringify(response))
                if(response && !response.hasOwnProperty('errorcode')){
                    if(response.reason == 'trackingrequest'){
                        return notRecH.trackingRequestAlert(response.sender);
                    }else if(response.reason == 'trackingresponse'){
                        return notRecH.trackingResponseAlert(response.sender);
                    }else if(response.reason == 'trackingaborted'){
                        return notRecH.trackingAbortedAlert(response.sender);
                    }
                }
            }
            console.log("NOTIFICATIONLISTENER ACTIVE")
            endpointCall(trackNotif, Urls.notification, {})
        }, 2000);
    };

    getTrackingState(mapCB){
        return mapCB(this.isTracked, this.tracker);
    }
}


export const sendTrackingRequest = function(email){
    let trackRequestSent = function(response,data){
        console.log(JSON.stringify(response))
        if (response && typeof response === 'object' && !response.hasOwnProperty("errorcode")) {
            return Alert.alert(
                'Tracking request send to user'
            )
        }else  if (response && typeof response === 'object' && response.hasOwnProperty("errorcode")){
            return Alert.alert(
                'Tracking not possible',
                ''+response.message
            )
        }
    }
    endpointCall(trackRequestSent, Urls.trackingRequest,{receiver:email})
}

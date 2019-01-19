import { Notifications } from 'expo';
import { AsyncStorage, Alert } from 'react-native';
import { prevAuthCall, endpointCall } from '../services/Rest';
import { LocationSender, LocationReceiver } from '../services/Location';
import Urls from '../constants/Urls';

export class NotificationReceiver{
    constructor(pushToken, isTracking) {
        this.isTracking = isTracking;
        this.hasPush = pushToken ? true : false;
        if(this.isTracking){
            this.locationSender = new LocationSender();
        }
        if(this.hasPush){
            console.log(pushToken);
          //  this._notifListener = this._handleTrackingNotification();
        }else{
            this._notifListener = this._handleTrackingRestNotification();
        }
    }

    sentTrackingAnswer(isAllowed){
        let sentLocation = function(response, data){
            if(response){
                console.log(JSON.stringify(response));
            }
        }
        let trackRequestResponse = function(response, data){
            if (response && typeof response === 'object' && !response.hasOwnProperty("errorcode") && isAllowed === true) {
                locationSender.sendLocation();
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
            let sentLocation = function(response, data){
                return null;
            }
            let trackRequestResponse = function(response, data){
                if (response && typeof response === 'object' && !response.hasOwnProperty("errorcode")) {
                    return Alert.alert(
                        "Tracking startet",
                        "You're now tracked by "+response.sender.username
                    )
                }
            }
            if(isAllowed){
                notRec.locationSender.sendLocation(sentLocation);
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
            console.log(JSON.stringify(response))
        }
        this._locReceiver = new LocationReceiver()
        this._locReceiver.receiveLocation(receivedLoc,sender);
        return Alert.alert(
            'Tracking request accepted',
            "You're now tracking "+sender
        )
    }

    _handleTrackingRestNotification = () => {
        let notRecH = this;
        this.notifFetcher = setInterval(() => {
            let trackNotif = function(response, data){
                if(response && !response.hasOwnProperty('errorcode')){
                    if(response.reason == 'trackingrequest'){
                        return notRecH.trackingRequestAlert(response.sender);
                    }else if(response.reason == 'trackingresponse'){
                        return notRecH.trackingResponseAlert(response.sender);
                    }
                }
            }
            endpointCall(trackNotif, Urls.notification, {})
        }, 2000);
    };
}


export const sendTrackingRequest = function(email){
    let trackRequestSent = function(response,data){
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

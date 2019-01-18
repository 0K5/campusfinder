import { Notifications } from 'expo';
import { AsyncStorage, Alert } from 'react-native';
import { prevAuthCall, endpointCall } from '../services/Rest';
import { LocationSender, LocationReceiver } from '../services/Location';
import Urls from '../constants/Urls';

export class NotificationReceiver{
    constructor(data) {
        this.isTracking = data.hasOwnProperty('isTracking') ? data['isTracking'] : false;
        if(this.isTracking){
            this.locationSender = new LocationSender();
        }
        this._notifListener = Notifications.addListener(this._handleNotification);
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
                        "You're now tracked by "+response.sender
                    )
                }
            }
            if(isAllowed){
                notRec.locationSender.sendLocation(sentLocation);
                return endpointCall(trackRequestResponse, Urls.trackingResponse, {receiver:sender, confirmed:isAllowed});
            }
        }
        if(this.locationSender){
            return Alert.alert(
                'Tracking Startet',
                ''+sender+' wants to track you on the campus',
                [
                    {text: 'Deny', onPress: () => sentTrackingAnswer(false), style: 'cancel'},
                    {text: 'Allow', onPress: () => sentTrackingAnswer(true)},
                ],
                { cancelable: false }
            )
        }else{
            return endpointCall(empty, Urls.trackingResponse, {receiver:sender, confirmed:isAllowed});
        }
    };

    trackingResponseAlert(sender){
        let receivedLoc = (response, data) =>{
            console.log(JSON.stringify(response))
        }
        LocationReceiver.receiveLocation(receivedLoc,sender)
        return Alert.alert(
            'Tracking request accepted',
            "You're now tracking "+sender
        )
    }

    _handleNotification = (notification) => {
        if(notification){
            data = notification.data;
            if(data && data.hasOwnProperty('type')){
                if (data.type === "" && this.isTracking && data.hasOwnProperty('sender')){
                    return this.trackingRequestAlert(data.sender);
                }else if(data.type === "trackingresponse" && this.isTracking && data.hasOwnProperty('sender')){
                    return this.trackingResponseAlert(data.sender);
                }else if(data.hasOwnProperty('errorcode')){
                    Alert.alert(data.message)
                }
            }
        }
    };
}


export const sendTrackingRequest = async function(email){
    let trackRequestSent = function(response,data){
        if (response && typeof response === 'object' && response.hasOwnProperty("errorcode")) {
            return Alert.alert(
                'Tracking not possible',
                ''+response.message
            )
        }
    }
    endpointCall(trackRequestSent, Urls.trackingRequest,{receiver:email})
}

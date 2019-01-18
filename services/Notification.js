import { Notifications } from 'expo';
import { AsyncStorage, Alert } from 'react-native';
import { prevAuthCall, endpointCall } from '../services/Rest';
import { LocationSender } from '../services/Location';
import Urls from '../constants/Urls';

export class NotificationReceiver{
    constructor(data) {
        this.isTracking = data.hasOwnProperty('isTracking') ? data.isTracking : false;
        this.watchId = undefined;
        this.locationSender = LocationSender();
        Notifications.addListener(this._handleNotification);
    }

    sentTrackingAnswer(isAllowed){
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
        return Alert.alert(
            'Tracking Request',
            ''+origin+' wants to track you on the campus',
            [
                {text: 'Deny', onPress: () => this.sendTrackingAnswer(false), style: 'cancel'},
                {text: 'Allow', onPress: () => this.sendTrackingAnswer(true)},
            ],
            { cancelable: false }
        )
    };

    trackingResponseAlert(sender){

    }

    _handleNotification = (notification) => {
        if(notification){
            data = notification.data;
            if(data && data.hasOwnProperty('type')){
                if (data.type === "trackingrequest" && this.isTracking && data.hasOwnProperty('sender')){
                    return this.trackingRequestAlert(data.sender);
                }else if(data.type === "trackingresponse" && this.isTracking && data.hasOwnProperty('origin')){
                    return this.trackingResponseAlert(data.tracked);
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

import { Notifications } from 'expo';
import { AsyncStorage, Alert } from 'react-native';
import { prevAuthCall, endpointCall } from '../services/Rest';
import { LocationActivator } from '../services/Location';
import Urls from '../constants/Urls';

export class Notification{
    constructor(map) {
        let cThis = this;
        this.map = map;
        let readSettings = () => {
            AsyncStorage.getItem('settings')
            .then(settingsString => {
                let settings = JSON.parse(settingsString);
                if(settings){
                    let isTracking = settings.isTracking;
                    let isNotification = settings.isNotification;
                    if(isNotification){
                        cThis._notifListener = cThis._handleTrackingNotification();
                    }
                    if(isTracking && isNotification){
                        cThis._locActivator = new LocationActivator(cThis.map);
                    }
                    cThis.isTracked = false;
                }
            })
        }
        AsyncStorage.getItem('profile')
        .then(profileString => {
            let profile = JSON.parse(profileString);
            if (profile){
                cThis.hasPush = profile.pushToken && profile.pushToken != "" ? true : false;
                readSettings();
            }
        })
    }

    sentTrackingAnswer(isAllowed){
        let sTAThis = this;
        let sentLocation = function(response, data){
            if(response){
                //sTAThis.map.trackUser(response.sender);
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
        let notRec = this;
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
        let firstFetch = Date.now();
        let startReceiving = (response, data) => {
            let receiveTime = (Date.now() - firstFetch) * 20;
            console.log("NOTIFICATION INVERVAL: " + receiveTime);
            this.notifFetcher = setInterval(() => {
                let trackNotif = function(response, data){
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
                endpointCall(trackNotif, Urls.notification, {})
            }, receiveTime);
        };
        console.log("NOTIFICATIONTRACKINGS")
        endpointCall(startReceiving, Urls.notification, {})
    };

    sendTrackingRequest(cb, email){
        let sTRThis = this;
        let trackRequestSent = function(response,data){
            console.log(JSON.stringify(response))
            if (response && typeof response === 'object' && !response.hasOwnProperty("errorcode")) {
                let receivedLocation = (response, data) => {
                     console.log(JSON.stringify(response));
                }
                sTRThis._locActivator.activateLocation(receivedLocation,email);
                return cb({'message': 'Tracking request send to user'}, true);
            }else  if (response && typeof response === 'object' && response.hasOwnProperty("errorcode")){
                return cb({'message': 'Tracking not possible','reason':JSON.stringify(response)}, false);
            }
        }
        endpointCall(trackRequestSent, Urls.trackingRequest,{receiver:email})
    }
}


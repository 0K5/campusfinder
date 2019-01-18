import { Constants, Permissions, Notifications } from 'expo';
import { prevAuthCall, endpointCall } from '../services/Rest';
import { AsyncStorage } from 'react-native';
import Urls from '../constants/Urls';

export const permissionRequest = async function(cb, data){
    console.log("permissionRequest");
    Permissions.askAsync(Permissions.LOCATION)
    .then(locationStatus => {
        console.log("Locstatus " + locationStatus.status)
        if (locationStatus.status === 'granted') {
            data['isTracking'] = true;
        }else{
            data['isTracking'] = false;
        }
        Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(statusNotification => {
            console.log("NOT1: " + statusNotification.status)
            if (statusNotification.status !== 'granted') {
                Permissions.getAsync(Permissions.NOTIFICATIONS)
                .then(statusNotificationAndroid => {
                    console.log("NOT2 " + statusNotificationAndroid)
                    if (statusNotificationAndroid.status === 'granted') {
                        Notifications.getExpoPushTokenAsync()
                        .then(token => {
                            data['pushToken'] = token;
                            return endpointCall(cb, Urls.notificationRegister, data);
                        })
                        .catch(error => {
                            data['pushToken'] = "";
                            return endpointCall(cb, Urls.notificationRegister, data);
                        });
                    }else{
                        data['pushToken'] = "";
                        return endpointCall(cb, Urls.notificationRegister, data);
                    }
                });
            }else{
                Notifications.getExpoPushTokenAsync()
                .then(token =>{
                    console.log(token);
                    data['pushToken'] = token;
                    return endpointCall(cb, Urls.notificationRegister, data);
                })
                .catch(error => {
                    data['pushToken'] = "";
                    console.log(error.message);
                    return endpointCall(cb, Urls.notificationRegister, data);
                });
            }
        });
    })
    .catch(error => {
        data['pushToken'] = "";
        return endpointCall(cb, Urls.notificationRegister, data);
    });
}
import { Constants, Permissions, Notifications } from 'expo';
import { prevAuthCall, endpointCall } from '../services/Rest';
import { AsyncStorage } from 'react-native';
import Urls from '../constants/Urls';

export const permissionRequest = async function(cb, data){
    Permissions.askAsync(Permissions.LOCATION)
    .then(locationStatus => {
        if (locationStatus.status === 'granted') {
            data['isTracking'] = true;
        }else{
            data['isTracking'] = false;
        }
        Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(statusNotification => {
            if (statusNotification.status !== 'granted') {
                Permissions.getAsync(Permissions.NOTIFICATIONS)
                .then(statusNotificationAndroid => {
                    if (statusNotificationAndroid.status === 'granted') {
                        Notifications.getExpoPushTokenAsync()
                        .then(token => {
                            data['pushToken'] = token;
                            return cb(data);
                        })
                        .catch(error => {
                            data['pushToken'] = "";
                            return cb(data);
                        });
                    }else{
                        data['pushToken'] = "";
                    return cb(data);
                    }
                });
            }else{
                Notifications.getExpoPushTokenAsync()
                .then(token =>{
                    console.log(token);
                    data['pushToken'] = token;
                    return cb(data);
                })
                .catch(error => {
                    data['pushToken'] = "";
                    return cb(data);
                });
            }
        });
    })
    .catch(error => {
        data['pushToken'] = "";
        return endpointCall(cb, Urls.notificationRegister, data);
    });
}
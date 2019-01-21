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
        return cb(data);
    })
    .catch(error => {
        data['pushToken'] = "";
        return endpointCall(cb, Urls.notificationRegister, data);
    });
}

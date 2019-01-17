import { permissionRequest } from '../services/Permission';
import { prevAuthCall, endpointCall } from '../services/Rest';
import { AsyncStorage } from 'react-native';
import Urls from '../constants/Urls';
import { LocationSender } from '../services/Location';
import { NotificationReceiver } from '../services/Notification';

export const loadFromRest = function(cb, token) {
    keySet = false;
    let loadedRooms = function(response, data){
        if (response && typeof response === 'object' && !response.hasOwnProperty("errorcode")) {
            console.log(JSON.stringify(response));
            AsyncStorage.setItem('rooms', JSON.stringify(response)).
            then(rooms => {
                return cb(true);
            })
            .catch(error => alert(error.message));
        }else{
            return cb(true);
        }
    };
    let loadedBuildings = function(response, data){
        if (response && typeof response === 'object' && !response.hasOwnProperty("errorcode")) {
            console.log(JSON.stringify(response));
            AsyncStorage.setItem('buildings', JSON.stringify(response))
            .then(buildings => {
                return endpointCall(loadedRooms, Urls.room, {})
            })
            .catch(error => alert(error.message));
        }else{
            return endpointCall(loadedRooms, Urls.room, {})
        }
    };
    let loadedSettingsOptions = function(response, data){
        if (response && typeof response === 'object' && !response.hasOwnProperty("errorcode")) {
            console.log(JSON.stringify(response));
            AsyncStorage.setItem('settingsoptions', JSON.stringify(response))
            .then(settings => {
                return endpointCall(loadedBuildings, Urls.building, {})
            })
            .catch(error => alert(error.message));
        }else{
            return endpointCall(loadedBuildings, Urls.building, {})
        }
    };
    let loadedSettings = function(response, data){
        if (response && typeof response === 'object' && !response.hasOwnProperty("errorcode")) {
            console.log(JSON.stringify(response));
            if(response.hasOwnProperty['isNotification'] && response.isNotification === true){
                NotificationReceiver(response.isTracking);
            }
            AsyncStorage.setItem('settings', JSON.stringify(response))
            .then(settings => {
                return endpointCall(loadedSettingsOptions, Urls.settingsoptions, {})
            })
            .catch(error => alert(error.message));
        }else{
            return endpointCall(loadedSettingsOptions, Urls.settingsoptions, {})
        }
    };
    let loadedProfile = function(response, data){
        if (response && typeof response === 'object' && !response.hasOwnProperty("errorcode")) {
            response['key'] = data['key'];
            if(data.pushToken === ""){
                data['isNotification'] = false;
            }
            console.log(JSON.stringify(response));
            AsyncStorage.setItem('profile', JSON.stringify(response))
            .then(savedProfile => {
                return endpointCall(loadedSettings, Urls.settings, data)
            })
            .catch(error => alert(error.message))
        }else{
            return endpointCall(loadedSettings, data)
        }
    };
    let loadedPermission = function(response, data){
        console.log(JSON.stringify(response));
        if (response && typeof response === 'object' && !response.hasOwnProperty("errorcode")) {
            return endpointCall(loadedProfile, Urls.profile, data)
        }else{
            return endpointCall(loadedProfile, Urls.profile, data)
        }
    };
    AsyncStorage.getItem('profile')
    .then(profile => {
        if(profile){
            profile = JSON.parse(profile);
            if (profile.hasOwnProperty('key')){
                let email = profile.email;
                key = profile.key;
                let setActualStates = function(response){
                    if(response.hasOwnProperty("is_authenticated") && response.is_authenticated){
                        return permissionRequest(loadedPermission, {'key':key})
                    }else{
                        return cb(false);
                    }
                };
                return endpointCall(setActualStates, Urls.authenticated, {'key':key})
            }else{
                return cb(false);
            }
        }else{
            return cb(false);
        }
    })
    .catch(error => cb(false));
}
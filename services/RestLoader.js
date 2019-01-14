import { prevAuthCall, endpointCall } from '../services/Rest';
import { AsyncStorage } from 'react-native';
import Urls from '../constants/Urls';

export const loadFromRest = function(cb, token) {
    keySet = false;
    let loadRooms = function(response, data){
        if (response && typeof response === 'object' && !("errorcode" in response)) {
            AsyncStorage.setItem('rooms', JSON.stringify(response)).
            then(rooms => {
                return cb(true);
            })
            .catch(error => alert(error.message));
        }else{
            return cb(true);
        }
    };
    let loadBuildings = function(response, data){
        if (response && typeof response === 'object' && !("errorcode" in response)) {
            AsyncStorage.setItem('buildings', JSON.stringify(response)).
            then(buildings => {
                return endpointCall(loadRooms, Urls.room, {})
            })
            .catch(error => alert(error.message));
        }else{
            return endpointCall(loadRooms, Urls.room, {})
        }
    };
    let loadSettings = function(response, data){
        if (response && typeof response === 'object' && !("errorcode" in response)) {
            AsyncStorage.setItem('settings', JSON.stringify(response)).
            then(settings => {
                return endpointCall(loadBuildings, Urls.building, {})
            })
            .catch(error => alert(error.message));
        }else{
            return endpointCall(loadBuildings, Urls.building, {})
        }
    };
    let loadProfile = function(response, data){
        if (response && typeof response === 'object' && !("errorcode" in response)) {
            response['key'] = data.key
            AsyncStorage.setItem('profile', JSON.stringify(response)).
            then(profile => {
                return endpointCall(loadSettings, Urls.settings, {})
            })
            .catch(error => alert(error.message));
        }else{
            return endpointCall(loadSettings, Urls.settings, {})
        }
    };
    AsyncStorage.getItem('profile')
    .then(profile => {
        if(profile){
            profile = JSON.parse(profile)
            if (profile.hasOwnProperty('email') && profile.hasOwnProperty('key')){
                let email = profile.email;
                key = profile.key;
                let setActualStates = function(response){
                    if(response.hasOwnProperty("is_authenticated") && response.is_authenticated){
                        return endpointCall(loadProfile, Urls.profile, {'key':key})
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
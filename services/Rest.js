import { AsyncStorage } from 'react-native';
import Urls from '../constants/Urls';

export const endpointCall = async function(cb, restUrl, data){
    AsyncStorage.getItem('profile').then((profile) => {
        if(!data){
            data = {};
        }
        profile = JSON.parse(profile)
        if(profile && profile.hasOwnProperty('key')){
            let key = profile.key;
            fetch(Urls.baseUrl + restUrl , {
                method: 'POST',
                 headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization' : "Token " + key
                          },
                 body: JSON.stringify(data)
            }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson){
                    return cb(responseJson, data)
                }else{
                    return cb({'errorcode':'1112',
                                'error': "500 Server Error. Please contact an admin of the app",
                                'errorMessage':error.message});
                }
            })
            .catch((error) => {
                return cb({'errorcode':'1113',
                    'error': "500 Server Error. Please contact an admin of the app",
                    'errorMessage':error.message});
            })
        }else{
            return cb({'errorcode':'1114', 'error': "Please register first"});
        }
    }).catch((error) => {
        cb({'errorcode':'1115',
            'error': "Rest.js : Endpoint call : Async Storage getItem error",
            'errorMessage':error.message});
    })
}

export const prevAuthCall = async function(cb, restUrl, data){
    if(!data){
        data = {};
    }
    fetch(Urls.baseUrl + restUrl , {
        method: 'POST',
         headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
         body: JSON.stringify(data)
    }).then((response) => response.json())
    .then((responseJson) => {
        return cb(responseJson, data)
    })
    .catch((error) => {
        return cb({'errorcode':'1121',
            'error':"500 Server Error. Please contact an admin of the app",
            'errorMessage': error.message});
    })
}
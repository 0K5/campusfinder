import { AsyncStorage } from 'react-native';
import Urls from '../constants/Urls';

export const endpointCall = async function(cb, restUrl, data){
    AsyncStorage.getItem('key').then((key) => {
        if(!data){
            data = {'blank':"blank"};
        }
        if(key){
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
                return cb(responseJson)
            })
            .catch((error) => {
                return cb({'errorcode':'112',
                    'error': "500 Server Error. Please contact an admin of the app",
                    'errorMessage':error.message});
            })
        }else{
            return cb({'errorcode':'113', 'error': "Please register first"});
        }
    }).catch((error) => {
        cb({'errorcode':'114',
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
        return cb({'errorcode':'121',
            'error':"500 Server Error. Please contact an admin of the app",
            'errorMessage': error.message});
    })
}
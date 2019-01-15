import { prevAuthCall, endpointCall } from '../services/Rest';
import { AsyncStorage } from 'react-native';
import Urls from '../constants/Urls';

export const saveData = async function(cb, storageKey, data){
     AsyncStorage.getItem(storageKey)
     .then((itemString) => {
        if(itemString){
            item = JSON.parse(itemString);
            if(item){
                if(data && data instanceof Object)
                for (let key in data){
                    if(item.hasOwnProperty(key)){
                        item[key] = data[key];
                    }
                }
                AsyncStorage.setItem(storageKey, JSON.stringify(item))
                .then(stored => {
                    let restUrl = Urls[storageKey];
                    if(restUrl){
                        endpointCall(cb, restUrl, item);
                    }else{
                        cb({'errorcode': '1311', 'error':'Data saved to AsyncStorage but not to the Server. The storage key is not present in /constants/Urls as a key for a restCall'})
                    }
                }).catch(error => cb({'errorcode': '1312', 'error':error.message}));
                }else{
                    cb({'errorcode': '1313', 'error':'No valid data. Please use JS Object. (JSON)'})
                }
            }else{
                cb({'errorcode': '1314', 'error':'Storage item not JSON parseable'})
            }
        }else{
            cb({'errorcode': '1315', 'error':'Not a valid storage item'})
        }
     }).catch(error => cb({'errorcode': '1316', 'error':error.message}));
}
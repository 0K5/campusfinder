import Urls from '../constants/Urls';
let realm = require('./Storage');

endpointCall = async (cb, restUrl, method, params) => {
    let user = realm.objects('User')[0];
    if(user){
          fetch(Urls.baseUrl + restUrl , {
                method: method,
                 headers: {
                            'Content-Type': 'application/json',
                            'key' : user.key
                          },
                 body: JSON.stringify(params)
          }).then((response) => response.json())
            .then((responseJson) => {
                cb(responseJson)
            })
            .catch((error) => {
                console.error(error);
            })
    }else{
        throw new Error("LoginError");
    }
}

prevAuthCall = async (cb, restUrl, method, params) => {
    fetch(Urls.baseUrl + restUrl , {
        method: method,
         headers: {
                    'Content-Type': 'application/json'
                  },
         body: JSON.stringify(params)
    }).then((response) => response.json())
    .then((responseJson) => {
        cb(responseJson)
    })
    .catch((error) => {
        console.error(error);
    })
}

module.exports = {
    prevAuthCall : prevAuthCall,
    endpointCall : endpointCall
}
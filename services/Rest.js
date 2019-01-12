import Urls from '../constants/Urls';
let realm = require('./Storage');

endpointCall = async (cb, restUrl, data) => {
    let user = realm.objects('User')[0];
    if(user){
          fetch(Urls.baseUrl + restUrl , {
                method: 'POST',
                 headers: {
                            'Content-Type': 'application/json',
                            'key' : user.key
                          },
                 body: JSON.stringify(data)
          }).then((response) => response.json())
            .then((responseJson) => {
                cb(responseJson)
            })
            .catch((error) => {
                console.error(error);
                alert("500 Server Error. Please contact an admin of the app");
            })
    }else{
        throw new Error("LoginError");
    }
}

prevAuthCall = async (cb, restUrl, data) => {
    fetch(Urls.baseUrl + restUrl , {
        method: 'POST',
         headers: {
                    'Content-Type': 'application/json'
                  },
         body: JSON.stringify(data)
    }).then((response) => response.json())
    .then((responseJson) => {
        cb(responseJson)
    })
    .catch((error) => {
        console.error(error);
        alert("500 Server Error. Please contact an admin of the app");
    })
}

module.exports = {
    prevAuthCall : prevAuthCall,
    endpointCall : endpointCall
}
Contains all REST endpoints to call under:

Home of the API: https://zerokfive.de/endpoints/<api_name>

Example: https://zerokfive.de/endpoints/example (403 if you're not logged in as a user)


To Start:\

Checkout checkout the master branch and then create your own branch. As soon as the feature of your branch is implemented request a merge with the master. The Merge will be reviewed from me because of security relevance and I'm responsible for everything on that server. Cheers

------------------------- BASIC INFORMATION ABOUT THE API ----------------------------

All requests need to be POST. 
So NEVER forget to put the '/' on the end of your URL.\
Means:\
https://zerokfive.de/endpoints/profile will return an error, because it's a GET-request.\
https://zerokfive.de/endpoints/profile/ is a POST-request.\

------------------------ AUTHENTICATION STUFF -----------------------------
```
User Registration: \
Method: POST \
Endpoint: https://zerokfive.de/rest-auth/registration \
Payload: application/json { "email": "", "password1" : "", "password2" : "" } \
HTMLView: https://zerokfive.de/accounts/signup \
```
```
User Login: \
Method: POST\
Endpoint: https://zerokfive.de/rest-auth/login/ \
Payload: application/json { "email": "", "password": "" }\
HTMLView: https://zerokfive.de/accounts/login/ \
```
```
Method: POST\
Endpoint: https://zerokfive.de/rest-auth/logout/ \
Headers: Authorization: JWT YOUR_TOKEN_HERE\
HTMLView: https://zerokfive.de/accounts/logout/ \
```
------------------------ ENDPOINTS TOKEN AUTHENTICATION -----------------------------

For authorization on enpoints put the token from realm db user inside the headers.
User needs to be authenticated for that. \

Example on React Native: \

```javascript
//IMPORT
let realm = require('../services/Storage').realm 
//CODE 
let foo = async (foo) => { \
  authorizationToken = realm.objects('User')[0].key;
  fetch('https://zerokfive.de/endpoints/foo/', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization': 'Token '+authorizationToken,
     },
     body: JSON.stringify({"foo": foo})
     }).then(response => response.json())
       .then(data => {
         var msg ="";
         console.log(data); 
         for (var key in data) {
           if (data.hasOwnProperty(key)) {
             if(key == 'key'){
               msg = data[key];
               this.props.navigation.navigate('crapper');
             } else{
               for (var i = 0; i < data[key].length; i++) {
                 msg = msg + data[key][i] + '\n'
             }
             msg = msg + " ";
             alert(msg);
             }
           }
       }
       })
       .catch(err => {
         console.log(err);
         alert("Connection to Server interrupted. Please check your internet connection");
       })
  } else{ 
     alert('Do Something better');
   }
```

------------------------ ENDPOINT PROFILE -----------------------------

To simply get profile or settings send an empty JSON.\

Like so:
```
Profile and Settings Get:
Method: POST\
Endpoint: https://zerokfive.de/endpoints/profile/
Payload: application/json\
{\
}\
Comments:\
Returns the Profile of the user
```

```
User Deletion:\
Method: POST\
Endpoint: https://zerokfive.de/endpoints/profile/delete/ \
Payload: application/json\ 
{\
}\
Comments:\
User with all corresponding data (profile, settings, ...) will be deleted\
```

```
Profile Create, Update and Get:\
Method: POST\
Endpoint: https://zerokfive.de/endpoints/profile/ \
Payload: application/json\ 
{\
	"firstname": String,\ 
	"lastname": String,\
    	"pushToken": String\
}\
Comments:\
firstname and lastname can be empty.\
pushToken can be empty if user won't allow push notifications\
role is automatically added in the backend. Roles are "guest","student" and "worker".
```

```
Settings Create, Update and Get:\
Method: POST\
Endpoint: https://zerokfive.de/endpoints/profile/ \
Payload: application/json\
{
	"isTracking": Boolean,\
	"isNotification": Boolean,\
	"visibility" : String ("all","faculty","department","nobody")\ 
	"faculty": String ("inf","ac","esb","tec","td","all")\
	"department": String ("teching","facleader","assistant","facservice","library","studservice"}\
}
Comments:\
isTracking: set to False or True\
isNotification: set to False or True\
visibility, faculty and department are database entries, so use one of the names above or request a new entry\
```


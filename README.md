Contains all REST endpoints to call under:

Home of the API: https://zerokfive.de/endpoints/<api_name>

Example: https://zerokfive.de/endpoints/example (403 if you're not logged in as a user)


To Start:\

Checkout checkout the master branch and then create your own branch. As soon as the feature of your branch is implemented request a merge with the master. The Merge will be reviewed from me because of security relevance and I'm responsible for everything on that server. Cheers

------------------------- BASIC INFORMATION ABOUT THE API ----------------------------

All requests need to be POST.\
So NEVER forget to put the '/' on the end of your URL.\
Means:\
https://zerokfive.de/endpoints/profile will return an error, because it's a GET-request.\
https://zerokfive.de/endpoints/profile/ is a POST-request.\

If there is an field "errormessage" in response, something went wrong.\
Example error response:\
```
Error Response: application/json\
{\
    "errorcode" : Errorcode that shows us where the error occurred,\
    "message": Errormessage\
}\
```
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
Errorcodes:\
121: User does not exists\
122: Deletion of user failed\
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
Success Response: application/json\
{\
    "message" : Status message,\
    "profile" : JSON of user profile\
}\
Errorcodes:\\
111: User does not exist\
Comments:\
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
	"department": String ("teaching","facleader","assistant","facservice","library","studservice")\
}
Errorcodes:\
131: User does not exist\
132: Profile of user does not exist (need to call https://zerokfive.de/endpoints/profile/ first)\
133: Visibility does not exist (needs to be one of these: "all","faculty","department","nobody"\ 
134: Faculty does not exist (needs to be one of these: "inf","ac","esb","tec","td","all")\ 
135: Department does not exist (needs to be one of these: "teaching","facleader","assistant","facservice","library","studservice"\ 
Comments:\
isTracking: set to False or True\
isNotification: set to False or True\
visibility, faculty and department are database entries, so use one of the names above or request a new entry\
```

------------------------ ENDPOINT BUILDING -----------------------------

To get all or one specific building(s).\

```
Get all or one building:\
Method: POST\
Endpoint: https://zerokfive.de/endpoints/building/\
Payload: application/json\
{\
    "building": Name of the building\
}\
Errorcodes:\
211: User does not exist\
212: Profile of user does not exist (need to call https://zerokfive.de/endpoints/profile/ first)\
213: Building does not exist\
Comments:\
Returns all buildings when json is empty or "building" field is empty.\
```

------------------------ ENDPOINT ROOM -----------------------------

To get all or one specific room(s).\

```
Get one building or room:\
Method: POST\
Endpoint: https://zerokfive.de/endpoints/building/room/\
Payload: application/json\
{\
    "building": Name of the building,\
    "room": Name of the room\
}\
Errorcodes:\
221: User does not exist\
222: Profile of user does not exist (need to call https://zerokfive.de/endpoints/profile/ first)\
223: Building not set (set "building" in the JSON request)\
224: Building does not exist\
225: Room does not exist\
Comments:\
Returns all rooms when "rooms" field in json is not existent or not empty.\
```

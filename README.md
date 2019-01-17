Contains all REST endpoints to call under:

Home of the API: https://zerokfive.de/endpoints/<api_name>

Example: https://zerokfive.de/endpoints/example (403 if you're not logged in as a user)


To Start:\

Register a user under:

https://zerokfive.de/accounts/signup/

Checkout checkout the master branch and then create your own branch. As soon as the feature of your branch is implemented request a merge with the master. The Merge will be reviewed from me because of security relevance and I'm responsible for everything on that server. Cheers

------------------------- Working with the Async Storage ----------------------------

Load Data from the Async Storage:\
```
Keys of the Async Storage after startup:\
'profile'\
'settings'\
'settingsoptions'\
'buildings'\
'rooms'\
```
Call Example with settings:\\
```javascript
// import the Async Storage 
import { AsyncStorage } from 'react-native';
//...
//Get the item you need from the AsyncStorage
AsyncStorage.getItem('settings').
    //This will come back as a String, so you have to Parse it first
    then(settingsString => {
      if(settingsString){
      //This will come back as a String, so you have to Parse it first
        settings = JSON.parse(settingsString)
        this.setState({ switchNoti: settings['isNotification'] });
        this.setState({ switchTrack: settings['isTracking'] });
        this.setState({ visiValue: settings['visibility'] });
        this.setState({ facValue: settings['faculty'] });
        handleFaculty(settings['faculty']);
        this.setState({ courValue: settings['course'] });
      }
    });
  }
```

Save Data to Async Storage and on the server:\

Example: Settings\
```javascript
  //import the saveData function from RestSaver class
  import {saveData} from '../services/RestSaver';
  //...
  //Save data with the function call beneath always pass a dictionary
  saveChange({'isNotification': setting}); 
  //...
  saveChange = (newSetting) => {	
    //This will be called after the data is successfully saved 
    let refreshAsyncStorage = (response, data) => {
      if(response && !response.hasOwnProperty('errorcode')){
         console.log(JSON.stringify(response));
      }else{
          console.log(JSON.stringify(response));
      }
    };
    //This is the actual save call that saves the data to Async Storage and on the server
    saveData(refreshAsyncStorage, 'settings', newSetting);
  }
```

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

For RestAPI calls use the imports:\
import Urls from '../constants/Urls';\
import endpointCall from '../services/Rest';\
enpointCall requires the user to be logged in which mostly is the case.\
```
function endpointcall:\
params: callback, restUrl, data\
callback: function you want to be called back after the response is there\
restUrl: Url to be called, taken from the Urls-Contants\
data: dict object with key value pairs for Rest Capp\
'''
Example: (Taken from Signin)
'''javascript
import { prevAuthCall, endpointCall } from '../services/Rest';
import Urls from '../constants/Urls';
...
signIn = function(){
    let comp = this; //this is to make the usage of referer "this" accessible in AsyncStorage.setItem promise resolve
    let saveResponse = function(response){
        if (response && typeof response === 'object' && "email" in response) {
            AsyncStorage.getItem('profile').
            then(profile => {
                profile = profile == null ? {} : JSON.parse(profile)
                profile['email'] = response.email;
                profile['firstname'] = response.firstname ? response.firstname : "";
                profile['lastname'] = response.lastname ? response.firstname : "";
                AsyncStorage.setItem('profile', JSON.stringify(profile))
                .then(profile => {
                    comp.props.navigation.navigate('map');
                })
                .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
        }else if (response){
            alert(JSON.stringify(response));
        }else{
            alert("'errorcode':'2221' 'error':'500 Server Error. Please contact an admin of the app'");
        }
    }
    let createProfile = function(response, data){
        if (response && typeof response === 'object' && "key" in response) {
            AsyncStorage.getItem('profile').
            then(profile => {
                profile = profile == null ? {} : JSON.parse(profile)
                profile['email'] = data.email;
                profile['key'] = response.key;
                AsyncStorage.setItem('profile', JSON.stringify(profile))
                .then(() => {
                    return endpointCall(saveResponse, Urls.profile,'')
                });
            })
            .catch(error => alert(error.message));
        }else if(response && typeof response === 'object' && "email" in response){
            return alert("Account not known. Please register first");
        }else if(response && typeof response === 'object' && "password" in response){
            return alert("Password field cannot be empty");
        }else if(response && typeof response === 'object' && "non_field_errors" in response){
            return alert("Wrong password or email.");
        }else if (response){
            return alert(JSON.stringify(response));
        }else{
            return alert("Please enter a valid emailaddress and password");
        }
    }
    prevAuthCall(createProfile, Urls.login,
        {"email": this.state.email, "password" : this.state.password}
    );
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
Response success example:
{
    "email": "campusfinderapp@gmail.com",
    "firstname": "test",
    "lastname": "user",
    "role": "guest",
    "lastLogin": null
}
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
{
    "email": "campusfinderapp@gmail.com",
    "firstname": "test",
    "lastname": "user",
    "role": "guest",
    "lastLogin": null
}
Errorcodes:\\
111: User does not exist\
Comments:\
role is automatically added in the backend. Roles are "guest","student" and "worker".
```

------------------------ ENDPOINT SETTINGS --------------------------------

```
Settings Create, Update and Get:\
Method: POST\
Endpoint: https://zerokfive.de/endpoints/profile/settings/ \
Payload: application/json\
{
	"isTracking": Boolean,\
	"isNotification": Boolean,\
	"visibility" : String ("all","faculty","department","nobody")\ 
	"faculty": String ("inf","ac","esb","tec","td","all")\
	"department": String ("teaching","facleader","assistant","facservice","library","studservice")\
}
Response success example:
{
    "isNotification": true,
    "isTracking": true,
    "visibility": "all",
    "faculty": null,
    "department": null
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

```
Settings All Options:\
Method: POST\
Endpoint: https://zerokfive.de/endpoints/profile/settings/options/ \
Payload: application/json\
{
}
Response success example:
{
    "visibilities": [
        {
            "name": "all"
        },
        {
            "name": "faculty"
        },
        {
            "name": "department"
        },
        {
            "name": "nobody"
        },
        {
            "name": "course"
        }
    ],
    "faculties": [
        {
            "name": "Informatik"
        },
        {
            "name": "Angewandte Chemie"
        },
        {
            "name": "ESB Business School"
        },
	//...
    ],
    "departments": [
        {
            "name": "teaching"
        },
        {
            "name": "facleader"
        },
        {
            "name": "assistant"
        },
	//...
    ],
    "courses": [
        {
            "name": "Medien- und Kommunikationsinformatik Bachelor Semester 1",
            "faculty": "Informatik"
        },
        {
            "name": "Medien- und Kommunikationsinformatik / Bachelor",
            "faculty": "Informatik"
        },
        {
            "name": "Wirtschaftsinformatik / Bachelor",
            "faculty": "Informatik"
        },
	//...
    ]
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
Response success example for {"building": "building9"}:
{
    "name": "building9",
    "faculty": {
        "name": "inf"
    },
    "department": {
        "name": "teaching"
    },
    "location": {
        "name": "building9",
        "latitude": "48.4830520000",
        "longitude": "9.1874960000",
        "latitudeDelta": "0.0070000000",
        "longitudeDelta": "0.0065000000",
        "createDate": "2019-01-13T22:57:56.602855Z",
        "updatedDate": "2019-01-13T22:57:56.602909Z"
    }
}
Response success example for {}:
[
    {
        "name": "building9",
        "faculty": {
            "name": "inf"
        },
        "department": {
            "name": "teaching"
        },
        "location": {
            "name": "building9",
            "latitude": "48.4830520000",
            "longitude": "9.1874960000",
            "latitudeDelta": "0.0070000000",
            "longitudeDelta": "0.0065000000",
            "createDate": "2019-01-13T22:57:56.602855Z",
            "updatedDate": "2019-01-13T22:57:56.602909Z"
        }
    },
    {
        "name": "building1",
        "faculty": {
            "name": "tec"
        },
        "department": {
            "name": "teaching"
        },
        "location": {
            "name": "building1",
            "latitude": "48.4812670000",
            "longitude": "9.1849270000",
            "latitudeDelta": "0.0050000000",
            "longitudeDelta": "0.0050000000",
            "createDate": "2019-01-13T23:14:15.697967Z",
            "updatedDate": "2019-01-13T23:14:15.698019Z"
        }
    }
]
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
Get one or all room(s) of a building:\
Method: POST\
Endpoint: https://zerokfive.de/endpoints/building/\
Payload: application/json\
{\
    "building": Name of the building,\
    "room": Name of the room\
}\
Response success example for {"building" : "building9","room": "9-007"}:
{
    "name": "9-007",
    "building": {
        "name": "building9",
        "searchTerms": "building, 9, gebäude, informatik, inf, informatic, computer, science",
        "createDate": "2019-01-13T23:05:26.175026Z",
        "updatedDate": "2019-01-13T23:05:26.175077Z",
        "faculty": "inf",
        "department": "teaching",
        "location": "building9"
    },
    "location": {
        "name": "building9",
        "latitude": "48.4830520000",
        "longitude": "9.1874960000",
        "latitudeDelta": "0.0070000000",
        "longitudeDelta": "0.0065000000",
        "createDate": "2019-01-13T22:57:56.602855Z",
        "updatedDate": "2019-01-13T22:57:56.602909Z"
    }
}
Response success example for {"building": "building9"}:
[
    {
        "name": "9-007",
        "building": {
            "name": "building9",
            "searchTerms": "building, 9, gebäude, informatik, inf, informatic, computer, science",
            "createDate": "2019-01-13T23:05:26.175026Z",
            "updatedDate": "2019-01-13T23:05:26.175077Z",
            "faculty": "inf",
            "department": "teaching",
            "location": "building9"
        },
        "location": {
            "name": "building9",
            "latitude": "48.4830520000",
            "longitude": "9.1874960000",
            "latitudeDelta": "0.0070000000",
            "longitudeDelta": "0.0065000000",
            "createDate": "2019-01-13T22:57:56.602855Z",
            "updatedDate": "2019-01-13T22:57:56.602909Z"
        }
    },
    {
        "name": "9-008",
        "building": {
            "name": "building9",
            "searchTerms": "building, 9, gebäude, informatik, inf, informatic, computer, science",
            "createDate": "2019-01-13T23:05:26.175026Z",
            "updatedDate": "2019-01-13T23:05:26.175077Z",
            "faculty": "inf",
            "department": "teaching",
            "location": "building9"
        },
        "location": {
            "name": "building9",
            "latitude": "48.4830520000",
            "longitude": "9.1874960000",
            "latitudeDelta": "0.0070000000",
            "longitudeDelta": "0.0065000000",
            "createDate": "2019-01-13T22:57:56.602855Z",
            "updatedDate": "2019-01-13T22:57:56.602909Z"
        }
    }
]
Errorcodes:\
221: User does not exist\
222: Profile of user does not exist (need to call https://zerokfive.de/endpoints/profile/ first)\
223: Building not set (set "building" in the JSON request)\
224: Building does not exist\
225: Room does not exist\
Comments:\
Returns all rooms when "rooms" field in json is not existent or empty.\
```


------------------------ ENDPOINT BUILDING POLYS ---------

To get all Polys for one building or all existent polys

```
Get one or all room(s) of a building:\
Method: POST\
Endpoint: https://zerokfive.de/endpoints/building/polys/\
Payload: application/json\
{\
    "building": Name of the building,\
    "room": Name of the room\
}\
Response success example for {"building" : "building9"}:
[
    {
        "building": "building9",
        "longitude": "9.1877370000",
        "latitude": "48.4827200000"
    },
    {
        "building": "building9",
        "longitude": "9.1869010000",
        "latitude": "48.4830380000"
    },
    {
        "building": "building9",
        "longitude": "9.1871960000",
        "latitude": "48.4833790000"
    },
    {
        "building": "building9",
        "longitude": "9.1880270000",
        "latitude": "48.4830670000"
    }
]
Response success example for {"building": "building9"}:
[
    {
        "building": "building9",
        "longitude": "9.1877370000",
        "latitude": "48.4827200000"
    },
    {
        "building": "building9",
        "longitude": "9.1869010000",
        "latitude": "48.4830380000"
    },
    {
        "building": "building9",
        "longitude": "9.1871960000",
        "latitude": "48.4833790000"
    },
    {
        "building": "building9",
        "longitude": "9.1880270000",
        "latitude": "48.4830670000"
    },
    {
        "building": "building1",
        "longitude": "9.1846110000",
        "latitude": "48.4807410000"
    },
	//<...>
]
Errorcodes:\
231: User does not exist\
232: Profile of user does not exist (need to call https://zerokfive.de/endpoints/profile/ first)\
233: Building not set (set "building" in the JSON request)\
Comments:\
Returns polygones of one building if "building" is set or all polygone locations when "building" field in json is not existent or empty.\
```

------------------------ ENDPOINT SEARCH --------------------------------

Searches for all occurrences in profiles, buildings and rooms so far.\
Buildings and rooms are searched only by given searchTerms, profiles are searched for mathing email, firstname or lastname.

```
Get one or all room(s) of a building:\
Method: POST\
Endpoint: https://zerokfive.de/endpoints/search/\
Payload: application/json\
{\
    "search": Input of the search field\
}\
Response success example for {"building" : "camp"}:
{
    "profiles": [
        {
            "email": "campusfinderapp@gmail.com"
        }
    ],
    "buildings": [],
    "rooms": []
}
Response success example for {"building": "9"}:
{
    "profiles": [],
    "buildings": [
        {
            "name": "building9"
        }
    ],
    "rooms": [
        {
            "name": "9-007"
        },
        {
            "name": "9-008"
        }
    ]
}
Errorcodes:\
return on empty search:
{
    "message": "Search term empty",
    "result": {}
}
311: User does not exist\
312: Profile of user does not exist (need to call https://zerokfive.de/endpoints/profile/ first)\
Comments:\
Returns polygones of one building if "building" is set or all polygone locations when "building" field in json is not existent or empty.\
```

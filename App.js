import {createStackNavigator, DrawerNavigator} from 'react-navigation';
import startup from './screens/Startup';
import signin from './screens/Signin';
import signup from './screens/Signup';
import settings from './screens/Settings';
import Profile from './screens/Profile';
import building9a from './screens/Building9a';
import building9b from './screens/Building9b';
import building9c from './screens/Building9c';
import building9entrance from './screens/Building9entrance';
import termsAndConditions from './screens/TermsAndContidions';
import map from './screens/Map';
import firebase from "firebase";

var config = {
    apiKey: "AIzaSyC-8--1yi1zXlG1d6kKfPWyYo3HGnYjUsc",
    authDomain: "campusfinder-4b980.firebaseapp.com",
    databaseURL: "https://campusfinder-4b980.firebaseio.com",
    projectId: "campusfinder-4b980",
    storageBucket: "campusfinder-4b980.appspot.com",
    messagingSenderId: "29692018773"
};
firebase.initializeApp(config);



const App = DrawerNavigator({
    home: {screen: startup,navigationOptions: () => ({
        title:'Home',
   })},
   signin: {screen: signin,navigationOptions: () => ({
     title:'Signin', 
     headerBackTitle:'Back',
    })},
  signup: {screen: signup,navigationOptions: () => ({title:'Signup', headerBackTitle:'Back'})},
  settings: {screen: settings,navigationOptions: () => ({title:'Settings', headerBackTitle:'Back'})},
  profile: {screen: Profile,navigationOptions: () => ({title:'Profile', headerBackTitle:'Back'})},
  building9entrance: {screen: building9entrance,navigationOptions: () => ({title:'Building9', headerBackTitle:'Back'})},
  building9a: {screen: building9a,navigationOptions: () => ({title:'Building9a', headerBackTitle:'Back'})},
  building9b: {screen: building9b,navigationOptions: () => ({title:'Building9b', headerBackTitle:'Back'})},
  building9c: {screen: building9c,navigationOptions: () => ({title:'Building9c', headerBackTitle:'Back'})},
  termsAndConditions: {screen: termsAndConditions,navigationOptions: () => ({title:'TermsAndConditions', headerBackTitle:'Back'})},
  map: {screen: map,navigationOptions: () => ({title:'Map', headerBackTitle:'Back'})},
  },{
    initialRouteName: 'home',
    drawerPosition: 'left',
   drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
});

export default App;

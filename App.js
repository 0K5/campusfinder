import {createStackNavigator} from 'react-navigation';
import startup from './screens/Startup';
import signin from './screens/Signin';
import signup from './screens/Signup';
import settings from './screens/Settings';
import profile from './screens/Profile';
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



const App = createStackNavigator({
    home: {screen: startup,navigationOptions: () => ({
        title:'CampusFinder',
   })},
   signin: {screen: signin,navigationOptions: () => ({
     title:'CampusFinder', 
     headerBackTitle:'Back',
    })},
  signup: {screen: signup,navigationOptions: () => ({title:'CampusFinder', headerBackTitle:'Back'})},
  settings: {screen: settings,navigationOptions: () => ({title:'Campusfinder', headerBackTitle:'Back'})},
  profile: {screen: profile,navigationOptions: () => ({title:'Campusfinder', headerBackTitle:'Back'})},
  building9entrance: {screen: building9entrance,navigationOptions: () => ({title:'Campusfinder', headerBackTitle:'Back'})},
  termsAndConditions: {screen: termsAndConditions,navigationOptions: () => ({title:'Campusfinder', headerBackTitle:'Back'})},
  map: {screen: map,navigationOptions: () => ({title:'CampusFinder', headerBackTitle:'Back'})},
});

export default App;

import {createStackNavigator} from 'react-navigation';
import signin from './screens/Signin';
import signup from './screens/Signup';
import settings from './screens/Settings';
import termsAndConditions from './screens/TermsAndContidions';
import React from 'react';
import { Text,TouchableOpacity, View, Image} from 'react-native';


const App = createStackNavigator({
   signin: {screen: signin,navigationOptions: () => ({
     title:'CampusFinder', 
     headerBackTitle:'Back',
    })},
  signup: {screen: signup,navigationOptions: () => ({title:'CampusFinder', headerBackTitle:'Back'})},
  settings: {screen: settings,navigationOptions: () => ({title:'Campusfinder', headerBackTitle:'Back'})},
  termsAndConditions: {screen: termsAndConditions,navigationOptions: () => ({title:'Campusfinder', headerBackTitle:'Back'})},
});

export default App;
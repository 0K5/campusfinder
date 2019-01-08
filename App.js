import {createStackNavigator} from 'react-navigation';
import signin from './screens/Signin';
import signup from './screens/Signup';
import settings from './screens/Settings';
import termsAndConditions from './screens/TermsAndContidions';
import map from './screens/Map';



const App = createStackNavigator({
   signin: {screen: signin,navigationOptions: () => ({
     title:'CampusFinder', 
     headerBackTitle:'Back',
    })},
  signup: {screen: signup,navigationOptions: () => ({title:'CampusFinder', headerBackTitle:'Back'})},
  settings: {screen: settings,navigationOptions: () => ({title:'Campusfinder', headerBackTitle:'Back'})},
  termsAndConditions: {screen: termsAndConditions,navigationOptions: () => ({title:'Campusfinder', headerBackTitle:'Back'})},
  map: {screen: map,navigationOptions: () => ({title:'CampusFinder', headerBackTitle:'Back'})},
});

export default App;
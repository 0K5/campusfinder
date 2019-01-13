import {createStackNavigator} from 'react-navigation';
import startup from './screens/Startup';
import signin from './screens/Signin';
import signup from './screens/Signup';
import settings from './screens/Settings';
import building9a from './screens/Building9a';
import building9b from './screens/Building9b';
import building9c from './screens/Building9c';
import building9entrance from './screens/Building9entrance';
import termsAndConditions from './screens/TermsAndContidions';
import map from './screens/Map';




const App = createStackNavigator({
    home: {screen: startup,navigationOptions: () => ({
        title:'CampusFinder',
        headerBackTitle:'Back',
   })},
   signin: {screen: signin,navigationOptions: () => ({
     title:'CampusFinder', 
     headerBackTitle:'Back',
    })},
  signup: {screen: signup,navigationOptions: () => ({title:'CampusFinder', headerBackTitle:'Back'})},
  settings: {screen: settings,navigationOptions: () => ({title:'Campusfinder', headerBackTitle:'Back'})},
  building9entrance: {screen: building9entrance,navigationOptions: () => ({title:'Campusfinder', headerBackTitle:'Back'})},
  building9a: {screen: building9a,navigationOptions: () => ({title:'Campusfinder', headerBackTitle:'Back'})},
  building9b: {screen: building9b,navigationOptions: () => ({title:'Campusfinder', headerBackTitle:'Back'})},
  building9c: {screen: building9c,navigationOptions: () => ({title:'Campusfinder', headerBackTitle:'Back'})},
<<<<<<< HEAD
  building: {screen: building,navigationOptions: () => ({title:'Campusfinder', headerBackTitle:'Back'})},
=======
>>>>>>> Include floors for building 9 with floormaps, no link between them
  termsAndConditions: {screen: termsAndConditions,navigationOptions: () => ({title:'Campusfinder', headerBackTitle:'Back'})},
  map: {screen: map,navigationOptions: () => ({title:'CampusFinder', headerBackTitle:'Back'})},
});

export default App;

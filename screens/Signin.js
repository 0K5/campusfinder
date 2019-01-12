//init signin
import React, { Component } from 'react';
import { StyleSheet,Text,TouchableOpacity, View,Image, TextInput,TouchableHighlight } from 'react-native';
import prevAuthCall from '../constants/Rest';
import endpointCall from '../constants/Rest';
import realm from '../constants/Storage';
import User from '../constants/Storage';

const styles = StyleSheet.create({
    campfind: {
        color: 'darkgrey',
        fontSize: 25,
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 0,
        width: '85%',
    },
    headerc:{
      marginTop:20,
      flex:1,
      flexDirection:'row',
      justifyContent:'space-between'
    },
    headerImage:{
      height: 40,
      width: 40,
      marginTop: 0,
      marginRight: 10
    },
    container:{
      flex:8,
      borderTopColor: 'grey',
      borderTopWidth: 1,
    },
    heading:{
      fontSize: 35,
      marginTop: 30,
      textAlign: 'center'
    },
    input: {
      
      height: 40,
      width: '80%',
      marginLeft: '10%',
      marginTop: '10%', 
      borderColor: 'grey',
      borderWidth: 1
   },
   Button: {
    backgroundColor: '#58ACFA',
    width: '70%',
    marginLeft:'15%',
    marginTop: 50,
    height: 45,
    justifyContent: 'center'
 },
  ButtonText:{
    color: 'white',
    textAlign: 'center',
    fontSize: 20

  },
  or:{
    textAlign: 'center',
    fontSize: 15,
    marginTop: 20,
    marginBottom: -30,
  }
});

export default class SignIn extends Component {
  state = {
    email: '',
    password: ''
 }
 handleEmail = (text) => {
    this.setState({ email: text })
 }
 handlePassword = (text) => {
    this.setState({ password: text })
 }

 signIn = () => {
    saveProfileToRealm = (response) => {
        if (response.hasOwnProperty('profile')) {
            realm.write(() => {
                let users = realm.objects('User');
                let user = items.filtered('email = '+response.profile.email)[0];
                for(key in response.profile){
                    user[key] = response.profile[key]
                }
                this.props.navigation.navigate('map');
             });
        }else if(response.hasOwnProperty('email'){
             alert("Account not known. Please register first");
        }else if(response.hasOwnProperty('non_field_errors')){
            alert("Wrong password or email.");
        }
        this.props.navigation.navigate('map');
    }
    createProfile = (email, response) => {
        if (response.hasOwnProperty('key')) {
             realm.write(() => {
                realm.create('User', { email: email, key: response.key})
             });
             endpointCall(saveProfileToRealm,
                         'rest-auth/profile/',
                         '');
        }else if(response.hasOwnProperty('email'){
             alert("Account not known. Please register first");
        }else if(response.hasOwnProperty('non_field_errors')){
            alert("Wrong password or email.");
        }
    }
    prevAuthCall(createProfile,
        'rest-auth/login/',
        {"email": this.state.email, "password" : this.state.password})
}

  render() {
    return (
          
          <View style={styles.container}>
            <Text style={styles.heading}>
              Log In
            </Text>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "   Email"
               placeholderTextColor = "grey"
               autoCapitalize = "none"
               onChangeText = {this.handleEmail}/>
            
            <TextInput style = {styles.input}
               secureTextEntry={true}
               underlineColorAndroid = "transparent"
               placeholder = "    Password"
               placeholderTextColor = "grey"
               autoCapitalize = "none"
               onChangeText = {this.handlePassword}/>
            
            <TouchableOpacity
               style = {styles.Button}
               onPress = {
                 
                  () => this.signIn()
               }>
               <Text style = {styles.ButtonText}> Login </Text>
            </TouchableOpacity>

            <Text style={styles.or}>
              Or
            </Text>

            <TouchableOpacity
               style = {styles.Button}
               onPress = {
                  () => this.props.navigation.navigate("signup")
               }>
               <Text style = {styles.ButtonText}> Sign Up </Text>
            </TouchableOpacity>

          </View>
          
        
     
        
  
      
      
    );
  }
}

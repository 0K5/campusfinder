//init signin
import React, { Component } from 'react';
import { StyleSheet,Text,TouchableOpacity, View,Image, TextInput,TouchableHighlight, AsyncStorage } from 'react-native';
import { prevAuthCall, endpointCall } from '../services/Rest';
import Urls from '../constants/Urls';

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

signIn = function(){
    let comp = this;
    let saveResponse = function(response, data){
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
            alert("'errorcode':'221' 'error':'500 Server Error. Please contact an admin of the app'");
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
                    console.log('endpointCall')
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

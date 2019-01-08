import React, { Component } from 'react';
import { StyleSheet,Text,TouchableOpacity, View,Image, TextInput,TouchableHighlight } from 'react-native';

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

  static navigationOptions = ({navigation})=>  {
    return{
    headerRight:
          <TouchableHighlight onPress={() => navigation.navigate('settings')}>
            <Image style={styles.headerImage} source={require('../img/settings.png')} />
          </TouchableHighlight>
      
    
  }}

  /*
       <Text style={styles.campfind}>CampusFinder</Text>
        
        <TouchableHighlight
        onPress = {
           () => this.handleclick
        }>
        <Image source={require('../img/settings.png')} style={styles.headerImage}></Image>
        </TouchableHighlight>
      */
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
  render() {
    const {navigation} = this.props;
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
               underlineColorAndroid = "transparent"
               placeholder = "    Password"
               placeholderTextColor = "grey"
               autoCapitalize = "none"
               onChangeText = {this.handlePassword}/>
            
            <TouchableOpacity
               style = {styles.Button}
               onPress = {
                 
                  () => this.login(this.state.email, this.state.password)
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

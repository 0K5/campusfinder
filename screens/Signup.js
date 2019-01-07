//init signup
import React, { Component } from 'react';
import { StyleSheet,Text,TouchableOpacity,TouchableHighlight, View,Image, TextInput} from 'react-native';
import CheckBox from 'react-native-check-box';


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
    checkBoxIcon:{
      height: 40,
      width: 40,
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
 ButtonTAC: {
  backgroundColor: 'grey',
  width: '60%',
  marginLeft:'20%',
  height: 30,
  justifyContent: 'center'
},
 Checkbox: {
  marginLeft:'23%',
  marginTop: 40,
  height: 60,
  justifyContent: 'center',
  width: '60%',
},
  ButtonText:{
    color: 'white',
    textAlign: 'center',
    fontSize: 20

  },
  
});

export default class SignUp extends Component {
  
  static navigationOptions = ({navigation})=>  {
    return{
    headerRight:
          <TouchableHighlight onPress={() => navigation.navigate('settings')}>
            <Image style={styles.headerImage} source={require('../img/settings.png')} />
          </TouchableHighlight>
      
    
  }}
  state = {
    email: '',
    password: '',
    name: ''
 }
 handleEmail = (text) => {
    this.setState({ email: text })
 }
 handlePassword = (text) => {
    this.setState({ password: text })
 }
 handleName = (text) => {
   this.setState({name: text}) 
  }
  render() {
   const {navigation} = this.props;
    return (
          <View style={styles.container}>
            <Text style={styles.heading}>
              Sign Up
            </Text>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "   Full Name"
               placeholderTextColor = "grey"
               autoCapitalize = "none"
               onChangeText = {this.handleName}/>
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "    Email"
               placeholderTextColor = "grey"
               autoCapitalize = "none"
               onChangeText = {this.handleEmail}/>

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "    Password"
               placeholderTextColor = "grey"
               autoCapitalize = "none"
               onChangeText = {this.handlePassword}/>

            
            
            <View style = {styles.Checkbox} >
            <CheckBox
                onClick={() => this.setState({isChecked: !this.state.isChecked})}
                rightText={"I accept the terms and conditions"}
                isChecked={this.state.isChecked}
              /></View>
              <TouchableOpacity
               style = {styles.ButtonTAC}
               onPress = {
                  () => this.props.navigation.navigate("termsAndConditions")
               }>
               <Text style = {styles.ButtonText}> Terms And Conditions </Text>
            </TouchableOpacity>


            <TouchableOpacity
               style = {styles.Button}
               onPress = {
                  () => this.signUp(this.state.name,this.state.email, this.state.password)
               }>
               <Text style = {styles.ButtonText}> Sign Up </Text>
            </TouchableOpacity>

          </View>
          
     
        
  
      
      
    );
  }
}

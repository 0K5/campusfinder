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
  
  state = {
    email: '',
    password: '',
    password2: '',
    termscondition: false
 }
 handleEmail = (text) => {
    this.setState({ email: text })
 }
 handlePassword = (text) => {
    this.setState({ password: text })
 }
 handlePassword2 = (text) => {
   this.setState({password2: text}) 
  }

 signUp = () => {
   if(!this.state.termscondition){
     alert('Please read the Terms and Conditions and confirm the checkbox')
   }else{
    if(this.state.password == this.state.password2  && this.state.password-length > 5 && this.state.email.length > 5){
      console.log(JSON.stringify({ "email": this.state.email, "password1" : this.state.password, "password2" : this.state.password2 }));
      fetch('https://zerokfive.de/rest-auth/registration', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "email": this.state.email, "password1" : this.state.password, "password2" : this.state.password2 })
      }).then(response => response.json())
        .then(data => {
          var msg ="";
          console.log(data);
          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              if(data[key] == "Verification e-mail sent."){
                msg = data[key];
              } else{
                for (var i = 0; i < data[key].length; i++) {
                  msg = msg + data[key][i] + '\n'
              }
              }
              
            }
        }
        msg = msg + " ";
        alert(msg);
        })
        .catch(err => {
          console.log(err)
          alert("Connection to Server interrupted. Please check your internet connection")
        })
    } else{
      alert("Please check your Email and type your Password again (Size 6)")
    }
   }
   
}

  render() {
    
  
    return (
          <View style={styles.container}>
            <Text style={styles.heading}>
              Sign Up
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

            <TextInput style = {styles.input}
               secureTextEntry={true}
               underlineColorAndroid = "transparent"
               placeholder = "    Password confirmation"
               placeholderTextColor = "grey"
               autoCapitalize = "none"
               onChangeText = {this.handlePassword2}/>

            
            
            <View style = {styles.Checkbox} >
            <CheckBox
                onClick={() => this.setState({termscondition: !this.state.termscondition})}
                rightText={"I accept the terms and conditions"}
                isChecked={this.state.termscondition}
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
                  () => this.signUp()
               }>
               <Text style = {styles.ButtonText}> Sign Up </Text>
            </TouchableOpacity>

          </View>
          
     
        
  
      
      
    );
  }
}

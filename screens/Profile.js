//init settings
import React, { Component } from 'react';
import { Alert, StyleSheet,Text,TextInput,TouchableOpacity ,View,ScrollView,AsyncStorage } from 'react-native';
import { loadFromRest } from '../services/RestLoader';
import {prevAuthCall, endpointCall} from '../services/Rest'
import Urls from '../constants/Urls';
import { styles } from '../constants/Styles';
import { saveData } from '../services/RestSaver';
import { SignIn } from '../screens/Signin';
import { SignUp } from '../screens/Signup';


export default class Profile extends Component {
    constructor(props) {
        super(props);
        console.log(JSON.stringify(props))
        this.state = {
            email: '',
            firstname: '',
            lastname: '',
            username: '',
            logout: false,
            deleteAccount: false
        };
    }

    componentDidMount(){
        AsyncStorage.getItem('profile')
        .then(profileString => {
            let profile = JSON.parse(profileString);
            this.setState({
                email : profile.email,
                firstname : profile.firstname,
                lastname : profile.lastname,
                username : profile.username,
                initFirstname : profile.firstname,
                initLastname : profile.lastname
            });
        });
    }

    componentWillUnmount(){
        let savedProfile = (response, data) => {
            console.log(JSON.stringify(response));
            if(!response || response.hasOwnProperty('errorcode')){
                return alert("Something went wrong on save");
            }
        };
        data = {
            firstname :this.state.firstname,
            lastname :  this.state.lastname
        }
        saveData(savedProfile, 'profile', data);
    }

    logout(){
        
        let confirmedLogout = function(response, data){
            alert("Logout confirmed");
        };
        endpointCall(confirmedLogout, Urls.logout, {});
        this.props.navigation.navigate("signin");
    };

    deleteAccount(isDeleteConfirmed){
        if(isDeleteConfirmed){
            let confirmedLogout = function(response, data){
                alert("Account deletion confirmed");
            };
            endpointCall(confirmedLogout, Urls.deleteAccount, {});
        }
    };

    deleteAccountConfirm(){
        return Alert.alert(
            'Tracking Request',
            ''+origin+' wants to track you on the campus',
            [
                {text: 'Cancel', onPress: () => this.deleteAccount(false), style: 'cancel'},
                {text: 'Delete Account', onPress: () => this.deleteAccount(true)},
            ],
            { cancelable: true }
        )
    }

    render(){
        return (
            <ScrollView>
                <View style= {styles.container}>
                    <Text style={styles.heading}>
                        Profile
                    </Text>
                </View>
                <View style={styles.row}>
                    <View style={{ flex: 1, paddingTop: 10}}>
                        <Text style={styles.text}>Email: {this.state.email}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={{ flex: 1, paddingTop: 10}}>
                        <Text style={styles.text}>Username: {this.state.username}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={{ flex: 1, paddingTop: 10}}>
                        <TextInput style = {styles.input}
                               underlineColorAndroid = "transparent"
                               placeholder = {"  " +this.state.initFirstname}
                               placeholderTextColor = "grey"
                               autoCapitalize = "none"
                               onChangeText = {(text) => this.setState({firstname:text})}/>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={{ flex: 1, paddingTop: 10}}>
                        <TextInput style = {styles.input}
                               underlineColorAndroid = "transparent"
                               placeholder = {"  " +this.state.initLastname}
                               placeholderTextColor = "grey"
                               autoCapitalize = "none"
                               onChangeText = {(text) => this.setState({lastname:text})}/>
                    </View>
                </View>
                <TouchableOpacity
               style = {styles.Button}
               onPress = {
                 
                  () => this.logout()
               }>
               <Text style = {styles.ButtonText}> Logout </Text>
            </TouchableOpacity>

            <TouchableOpacity
               style = {styles.Button}
               onPress = {
                  () => this.deleteAccountConfirm()
               }>
               <Text style = {styles.ButtonText}> Delete Account </Text>
            </TouchableOpacity>

            </ScrollView>
        )
    }
}
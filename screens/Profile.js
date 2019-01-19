//init settings
import React, { Component } from 'react';
import { Alert, StyleSheet,Text,TextInput,Button,View,ScrollView,AsyncStorage } from 'react-native';
import { loadFromRest } from '../services/RestLoader';
import {prevAuthCall, endpointCall} from '../services/Rest'
import Urls from '../constants/Urls';
import { styles } from '../constants/Styles';
import { saveData } from '../services/RestSaver';
import {SignIn} from '../screens/Signin';
import {SignUp} from '../screens/Signup';


export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
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

    componendDidUpdate(){
        this.render();
    }

    componentWillUnmount(){
        let savedProfile = (response, data) => {
            console.log(JSON.stringify(response));
            if(!response || response.hasOwnProperty('errorcode')){
                return alert("Something went wrong on save");
            }
        };
        data = {
            firstname : this.state.firstname,
            lastname : this.state.lastname
        }
        saveData(savedProfile, 'profile', data);
    }

    logout(){
        lThis = this;
        let confirmedLogout = function(response, data){
            lThis.isLogout = true;
        };
        endpointCall(confirmedLogout, Urls.logout, {});
    };

    deleteAccount(isDeleteConfirmed){
        lThis = this;
        if(isDeleteConfirmed){
            let confirmedLogout = function(response, data){
                lThis.isAccountDeleted = true;
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
        if(this.isLogout){
            return(
                <View>
                    <SignIn {...this.props} />
                </View>
            )
        }
        if(this.isAccountDeleted){
            return(
                <View>
                    <SignUp {...this.props} />
                </View>
            )
        }else{
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
                                   placeholder = {this.state.initFirstname}
                                   placeholderTextColor = "grey"
                                   autoCapitalize = "none"
                                   onChangeText = {(text) => this.setState({firstname:text})}/>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={{ flex: 1, paddingTop: 10}}>
                            <TextInput style = {styles.input}
                                   underlineColorAndroid = "transparent"
                                   placeholder = {this.state.initLastname}
                                   placeholderTextColor = "grey"
                                   autoCapitalize = "none"
                                   onChangeText = {(text) => this.setState({lastname:text})}/>
                        </View>
                    </View>
                    <Button
                        onPress={this.logout}
                        title="Logout"
                    />
                    <Button
                        onPress={this.deleteAccountConfirm}
                        title="Delete Account"
                    />
                </ScrollView>
            )
        }
    }
}
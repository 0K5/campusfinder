import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator } from 'react-native';
import { prevAuthCall, endpointCall } from '../services/Rest';
import Urls from '../constants/Urls';
import SignIn from '../screens/Signin';
import Map from '../screens/Map';

export default class AppContainer extends Component {

    constructor(props) {
        super(props);
        this.state = { keyValid: false, isLoaded: false };
    }

    componentWillMount() {
        this.checkAuth();
    }

    checkAuth() {
        let emailPromise = AsyncStorage.getItem('email');
        let keyPromise = AsyncStorage.getItem('key');

        Promise.all([emailPromise, keyPromise]).then((values) => {
            let email = values[0];
            let key = values[1];

            if(email && key){
                fetch(Urls.baseUrl + Urls.authenticated)
                .then(res => res.json())
                .then(
                (result) => {
                    this.setState({
                        keyValid: result.is_authenticated,
                        isLoaded: true
                    });
                },
                (error) => {
                    this.setState({
                        keyValid: false,
                        isLoaded: true
                    });
                }
                )
            }else{
                this.setState({
                    keyValid: false,
                    isLoaded: true
                });
            }
        });
    }

    render() {
        console.log(this.state);
        if (!this.state.isLoaded) {
            return (
                <ActivityIndicator {...this.props}/>
            );
        }else{
            if(!this.state.keyValid){
                return(
                    <SignIn {...this.props}/>
                );
            }else{
                return(
                    <Map />
                );
            }
        }
    }
}
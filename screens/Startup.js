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
        let comp = this;
        let emailPromise = AsyncStorage.getItem('email');
        let keyPromise = AsyncStorage.getItem('key');

        Promise.all([emailPromise, keyPromise]).then((values) => {
            let email = values[0];
            let key = values[1];

            if(email && key){
                let setActualStates = function(response){
                    if("is_authenticated" in response && response.is_authenticated){
                        comp.setState({
                            keyValid: true,
                            isLoaded: true
                        });
                    }else{
                        comp.setState({
                            keyValid: false,
                            isLoaded: true
                        });
                    }
                };
                endpointCall(setActualStates, Urls.authenticated, {'key':key})
            }else{
                comp.setState({
                    keyValid: false,
                    isLoaded: true
                });
            }
        })
        .catch(error => console.log(error));
    }

    render() {
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
                    <Map {...this.props}/>
                );
            }
        }
    }
}

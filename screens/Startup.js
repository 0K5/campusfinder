import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator } from 'react-native';
import { prevAuthCall, endpointCall } from '../services/Rest';
import Urls from '../constants/Urls';
import {loadFromRest} from '../services/RestLoader';
import SignIn from '../screens/Signin';
import Map from '../screens/Map';
import Settings from '../screens/Settings';
import Building9entrance from '../screens/Building9entrance';


export default class AppContainer extends Component {

    constructor(props) {
        super(props);
        this.state = { keyValid: false, isLoaded: false };
    }

    restLoad(){
        let comp = this;
        let redirect = function(keyValid){
            comp.setState({
                keyValid: keyValid,
                isLoaded: true
            });
        };
        loadFromRest(redirect);
    }

    componentWillMount() {
        this.restLoad();
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
                    <Building9entrance {...this.props}/>
                );
            }
        }
    }
}

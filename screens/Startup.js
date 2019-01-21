import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator, Image } from 'react-native';
import { prevAuthCall, endpointCall } from '../services/Rest';
import Urls from '../constants/Urls';
import {loadFromRest} from '../services/RestLoader';


export default class AppContainer extends Component {

    constructor(props) {
        super(props);
        this.state = { keyValid: false, isLoaded: false };
    }

    restLoad(){
        let comp = this;
        let redirect = function(keyValid){
            let next = keyValid ? 'map' : 'signin';
            comp.props.navigation.navigate(next,{props:comp.props});
        };
        loadFromRest(redirect);
    }

    componentWillMount() {
        this.restLoad();
    }

    render() {
        return (
            <Image
                source={require('../assets/images/splash.png')}
            ></Image>
        );
    }
}

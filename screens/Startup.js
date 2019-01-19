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

    navToNext(next){
        return this.props.navigation.navigate(next,{props:this.props});
    }

    render() {
        if (!this.state.isLoaded) {
            return (
                <Image
                    source={require('../assets/images/splash.png')}
                ></Image>
            );
        }else{
            if(!this.state.keyValid){
                return(
                    <Image
                        onLoad={() => this.navToNext('signin')}
                        source={require('../assets/images/splash.png')}
                    ></Image>
                );
            }else{
                return(
                    <Image
                        onLoad={() => this.navToNext('map')}
                        source={require('../assets/images/splash.png')}
                    ></Image>
                );
            }
        }
    }
}

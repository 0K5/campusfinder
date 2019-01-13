//init maps
import React, { Component } from 'react';
import MapView, { Callout } from 'react-native-maps';
import {Text, View, StyleSheet,Button,TextInput, TouchableHighlight, Image} from 'react-native';

const styles= StyleSheet.create({
    map:{
        left:0,
        right:0,
        bottom:0,
        top:0,
        position: 'absolute'
    },
    headerImage:{
        height: 40,
        width: 40,
        marginTop: 0,
        marginRight: 10
      },
      calloutView: {
        flexDirection: "row",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: 10,
        width: "60%",
        marginLeft: "20%",
        marginTop: 20
      },
      calloutSearch: {
        borderColor: "transparent",
        marginLeft: 10,
        width: "90%",
        marginRight: 10,
        height: 40,
        borderWidth: 0.0  
      },
      button:{
        backgroundColor: '#58ACFA',
        width: '30%',
        marginLeft:'70%',
        borderRadius: 10,
        marginTop: 20,
        height: 40,
        justifyContent: 'center'
      },
})

export default class Map extends Component {


    state = {
        region:{latitude: 48.482522, longitude: 9.187809, latitudeDelta: 0.007,longitudeDelta: 0.0025}
    }


    static navigationOptions = ({navigation})=>  {
        return{
        headerRight:
              <TouchableHighlight onPress={() => navigation.navigate('building9entrance')}>
                <Image style={styles.headerImage} source={require('../img/settings.png')} />
              </TouchableHighlight>
          
        
      }}

    setRegion(){
        console.log('hallo')
    }  
    
    render(){
        return(
            <MapView
                style={styles.map}
                region={this.state.region}
                rotateEnabled={false}
                mapType={"hybrid"}
                maxDelta={0.0035}
                showsBuildings={true}


                
            >
                
      
            </MapView>
        )
    }
}

//init maps
import React, { Component } from 'react';
import MapView, {Callout, Polygon,LatLng } from 'react-native-maps';
import {Text, View, StyleSheet,Button,TextInput, TouchableHighlight, Image, Alert} from 'react-native';

const styles= StyleSheet.create({
    map:{
        left:0,
        right:0,
        bottom:0,
        top:'5%',
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
        
        //backgroundColor: '#58ACFA',
       // width: '30%',
       // marginLeft:'68%',
       // borderRadius: 10,
        marginTop: '23%',
        height: 40,
       // justifyContent: 'center'
      },
})

export default class Map extends Component {
    48.481881

    state = {
        region:{latitude: 48.482522, longitude: 9.187809, latitudeDelta: 0.007,longitudeDelta: 0.0025}
    }

    Building9=[{ latitude:48.482729,longitude:9.187737},{latitude:48.483038,longitude:9.186901},{latitude:48.483379,longitude:9.187196},{latitude:48.483067,longitude:9.188027}]
    Mensa=[{latitude:48.481881,longitude:9.188568},{latitude:48.481959,longitude:9.188364},{latitude:48.482037,longitude:9.188402},{latitude:48.482091,longitude:9.188318},{latitude:48.482159,longitude:9.188375},{latitude:48.482235,longitude:9.188173},{latitude:48.482556,longitude:9.188441},{latitude:48.482524,longitude:9.188585},{latitude:48.482624,longitude:9.188696},{latitude:48.482451,longitude:9.189172}]

   

    static navigationOptions = ({navigation})=>  {
        return{
        headerRight:
              <TouchableHighlight onPress={() => navigation.navigate('settings')}>
                <Image style={styles.headerImage} source={require('../img/settings.png')} />
              </TouchableHighlight>
          
        
      }}
      

    setRegion(){
        console.log("Tap")
        
    }  

    clickBuilding(){
       
    }
    
    render(){
        return(
            <View style={styles.map}>
            <MapView
                style={styles.map}
                region={this.state.region}
                rotateEnabled={false}
                mapType={"hybrid"}
                maxDelta={0.0035}
                showsBuildings={true}
                //showsUserLocation={true}
                
             >
            <Callout>
                <View style={styles.calloutView} >
                <TextInput style={styles.calloutSearch}
                            placeholder={"Search"}
                />
                </View>
            </Callout>
             
             <Polygon
                coordinates={this.Building9}
                strokeColor={"rgba(0,0,0,0.1)"}
                tappable={true}
                onPress={()=>  Alert.alert(
                    'Gebäude 9 - Informatik',
                    'Öffnungszeiten: ',
                    [
                        {text: 'Cancel', onPress:() => console.log("Cancel")},
                        {text: 'Go In', onPress:() => console.log("Go In")}
                    
                    ]
                    )}
             >
                 
             </Polygon>
             <Polygon
                coordinates={this.Mensa}
                strokeColor={"rgba(0,0,0,1)"}
                tappable={true}
                onPress={()=>  Alert.alert(
                    'Gebäude 8 - Mensa',
                    'Öffnungszeiten: ',
                    [
                        {text: 'Cancel', onPress:() => console.log("Cancel")},
                        {text: 'Go In', onPress:() => console.log("Go In")}
                    
                    ]
                    )}
             >
                 
             </Polygon>
             
            <Callout>
              <TouchableHighlight onPress={() => this.setRegion(MapView)}>
                <Text style={styles.button}>Campus
            
                </Text>
              </TouchableHighlight>
                
            </Callout>
            
             </MapView>
             
                
              
      
            
        </View>
        )
    }
}

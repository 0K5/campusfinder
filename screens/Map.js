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
        width: "70%",
        marginLeft: "5%",
        marginTop: 20
      },
      calloutSearch: {
        borderColor: "transparent",
        marginLeft: 10,
        width: "90%",
        marginRight: 10,
        height: 40,
      },
      button:{
        flexDirection: "row",
        backgroundColor: '#58ACFA',
        width: '35%',
        marginLeft:'63%',
        borderRadius: 10,
        marginTop: 20,
        height: 40,
        justifyContent: 'center',
      },
})

export default class Map extends Component {
    state = {
        region:{latitude: 48.482522, longitude: 9.187809, latitudeDelta: 0.007,longitudeDelta: 0.0025},
        uniqueValue:1    
    }

    Building9=[{ latitude:48.482729,longitude:9.187737},{latitude:48.483038,longitude:9.186901},{latitude:48.483379,longitude:9.187196},{latitude:48.483067,longitude:9.188027}]
    Building7=[{latitude:48.481881,longitude:9.188568},{latitude:48.481959,longitude:9.188364},{latitude:48.482037,longitude:9.188402},{latitude:48.482091,longitude:9.188318},{latitude:48.482159,longitude:9.188375},{latitude:48.482235,longitude:9.188173},{latitude:48.482556,longitude:9.188441},{latitude:48.482524,longitude:9.188585},{latitude:48.482624,longitude:9.188696},{latitude:48.482451,longitude:9.189172}]
    Building4=[{ latitude:48.482166,longitude:9.186438},{latitude:48.482307,longitude:9.186560},{latitude:48.482205,longitude:9.186849},{latitude:48.482239,longitude:9.186891},{latitude:48.482188, longitude:9.187019},{latitude:48.482018, longitude:9.186880},{latitude:48.481905, longitude:9.187170},{latitude:48.481761, longitude:9.187023},{latitude:48.481859, longitude:9.186737},{latitude:48.481834, longitude:9.186700},{latitude:48.481878, longitude:9.186571}]
   

    static navigationOptions = ({navigation})=>  {
        return{
        headerRight:
              <TouchableHighlight onPress={() => navigation.navigate('settings')}>
                <Image style={styles.headerImage} source={require('../img/settings.png')} />
              </TouchableHighlight>
          
        
      }}
      

    screenreloading = () =>{
        this.setState(({uniqueValue}) => ({
            uniqueValue: uniqueValue +1
        }));
    } 

    clickBuilding =(number) =>{
      let text =''
      let building = ''
      let message =''
      switch(number){
        case 9:
        text = "Gebäude 9 - Informatik",
        message = 'Öffnungszeiten:'
        building = 'Building9'
        break;
        case 3:
        text = 'Gebäude 3 - Bibliothek',
        message = 'Öffnungszeiten:'
        building = 'Building9'
        break;
        case 4:
        text = 'Gebäude 4 - ??',
        message = 'Öffnungszeiten:'
        building = 'Building9'
        break;
        case 6:
        text = 'Gebäude 6 - Aula',
        message = 'Öffnungszeiten:'
        building = 'Building9'
        break;
        case 7:
        text = 'Gebäude 7 - Mensa',
        message = 'Öffnungszeiten:'
        building = 'Building9'
        break;
    }
        Alert.alert(
          
            text,
            message,
            [
                {text: 'Cancel', onPress:() => console.log("Cancel")},
                {text: 'Go In', onPress:() => console.log("Go In")} //this.navigation.navigate(building) <-- zum verliken auf die gebäuden
            
            ]
          )
        
    }
    
    render(){
        return(
            <View style={styles.map} key={this.state.uniqueValue}>
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
                onPress={(number)=>  this.clickBuilding(9)}
             >
            
             </Polygon>
          
             <Polygon
                coordinates={this.Building7}
                strokeColor={"rgba(0,0,0,0.1)"}
                tappable={true}
                onPress={(number)=>  this.clickBuilding(7)}
             >
                 
             </Polygon>
             
             <Polygon
                coordinates={this.Building4}
                strokeColor={"rgba(0,0,0,0.1)"}
                tappable={true}
                onPress={(number)=>  this.clickBuilding(4)}
             >
                 
             </Polygon>


            <Callout>
                <View style={styles.button}>
              <Button  title={"Go To Campus"} onPress={this.screenreloading}/>
                </View>
            </Callout>
            
             </MapView>
             
                
              
      
            
        </View>
        )
    }
}

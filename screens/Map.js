//init maps
import React, { Component } from 'react';
import MapView, {Callout, Polygon,LatLng} from 'react-native-maps';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {  ImageBackground, Text, View, StyleSheet,Button,TextInput, TouchableHighlight,TouchableOpacity, Image, Alert,AsyncStorage} from 'react-native';
import SwipeUpDown from 'react-native-swipe-up-down';
import { Col, Row, Grid } from "react-native-easy-grid";
//import ReactNativeTooltipMenu from 'react-native-tooltip-menu';
import Menu, { MenuItem } from 'react-native-material-menu';

import Urls from '../constants/Urls';
import { prevAuthCall, endpointCall } from '../services/Rest';



const styles= StyleSheet.create({
    map:{
        left:0,
        right:0,
        bottom:0,
        top:0,
        position: 'absolute'
    },
    contentView:{
        left:0,
        right:0,
        bottom:0,
        top:8,
        position: 'absolute'
    },
    headerImage:{
        height: 40,
        width: 40,
        marginTop: 0,
        marginBottom: 5,
        marginRight: 10
      },
      menuImage:{
        height: '50%',
        width: '50%',
        marginTop: '25%',
        marginLeft: '25%'
      },
      
      calloutView: {
        flexDirection: "row",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: 10,
        width: "90%",
        marginLeft: "5%",
        marginTop: 10
      },
      calloutSearch: {
        borderColor: "transparent",
        marginLeft: 10,
        width: "90%",
        marginRight: 10,
        height: 40,
      },
      button:{
        backgroundColor: 'lightblue',
        width: '90%',
        marginLeft:'5%',
        borderRadius: 10,
        marginTop: 0,
        height: 40,
        textAlign:'center'
      },
      
    
})

let buildings;
export default class Map extends Component {
    state = {
        region:{latitude: 48.483336,     longitude: 9.186335 ,   latitudeDelta: 0.0010,longitudeDelta: 0.0010},
        uniqueValue:1  ,
        searchBar : [
        ]
    }
    
    constructor(props){
        super(props);
        
        AsyncStorage.getItem('buildingPolys').
    then(bpstring => {
    if(bpstring){
      bpstring = bpstring == null ? {} : JSON.parse(bpstring)
      for(i = 0; i< bpstring.length;i++){
        console.log(bpstring.length);
        this.buildings[parseInt(bpstring[i].building.replace(/[^\d.]/g, '' ))].push({latitude: bpstring[i].latitude,longitude: bpstring[i].longitude})
      }
        console.log(buildings[9])
    }
  });

        AsyncStorage.getItem('profil').
        then(profil => {
      if(profil){
        profil = profil == null ? {} : JSON.parse(profil)
        setState({ 
          key: profil['key']
       });
       // console.log(JSON.stringify(settingsString))
      }
      
    });

    
    
    

     }


      
     
    

    //Buildings of the Campus with corner-coordinates

    

        


    static navigationOptions = ({navigation})=>  {
        return{
        headerRight:
            <TouchableHighlight onPress={() => navigation.navigate('settings')}>
                <Image style={styles.headerImage} source={require('../img/settings.png')} />
            </TouchableHighlight>,
        headerLeft:
            <TouchableHighlight onPress={() => navigation.navigate('profile')}>
                <Image style={styles.headerImage} source={require('../img/profile.png')} />
            </TouchableHighlight>
        }}


    iconClicked = () =>{
        this.props.navigation.navigate('Signin');
    }
    searchbar = (event) => {
        mapWin = this
        if(event.length <= 1){
            mapWin.setState({'searchBar':[]})
        }else{
            //console.log(event)
            let searchResponse = function(response){
                let res = {};
                let srchbar = [];
                let id = 0;
                for(key in response){
                    res[key] = [];
                    for(item in response[key]){
                        res[key].push(response[key][item]);
                        if(response[key][item].hasOwnProperty('name')){
                            srchbar.push({'name': response[key][item].name, 'id' : id})
                            id = id + 1;
                        }else{
                            srchbar.push({'name': response[key][item].email, 'id' : id})
                            id = id + 1;
                        }
                    }
                    mapWin.setState({'search':res})
                    mapWin.setState({'searchBar':srchbar})
                }
            };
            endpointCall(searchResponse, Urls.search,{ "search": event })
        }
        
    }

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
        
        case 1:
        text = "Gebäude 1 - Textil & Design - Maschinenhalle",
        message = "TEXTIL & DESIGN\nSCHOOL OF TEXTILES & DESIGN\nBETRIEBSHALLE\nZENTRALWERKSTATT\nMASCHINENLABORE TECHNIK\nLEHR- UND FORSCHUNGSZENTRUM\nINTERAKTIVE MATERIALIEN"
        building = 'Building1'
        break;
        
        case 2:
        text = "Gebäude 2 - ANGEWANDTE CHEMIE / DEKANAT",
        message = 'SCHOOL OF APPLIED CHEMISTRY\nREUTLINGEN RESEARCH INSTITUTE'
        building = 'Building2'
        break;
        
        case 3:
        text = 'Gebäude 3 - Bibliothek',
        message = 'PRÄSIDIUM / VERWALTUNG \n STUDIENSERVICECENTER\nINTERNATIONAL OFFICE\nLERNZENTRUM'
        building = 'Building3'
        break;
        
        case 4:
        text = 'Gebäude 4 - TECHNIK / DEKANAT',
        message = 'SCHOOL OF ENGINEERING'
        building = 'Building4'
        break;

        case 5:
        text = "Gebäude 5 - ESB BUSINESS SCHOOL",
        message = 'REUTLINGEN RESEARCH INSTITUTE \n STEINBEIS TRANSFER GMBH'
        building = 'Building5'
        
        break;
        case 6:
        text = 'Gebäude 6 - Aula',
        building = 'Building6'
        
        break;
        case 7:
        text = 'Gebäude 7 - Mensa',
        message = 'SEMINAR FÜR DIDAKTIK UND LEHRERBILDUNG'
        building = 'Building7'
        break;

        case 8:
        text = "Gebäude 8",
        message = 'Rechen und Medienzentrum'
        building = 'Building8'
        break;

        case 9:
        text = "Gebäude 9 - Informatik",
        message = 'SCHOOL OF INFORMATICS'
        building = 'building9entrance'
        break;

        case 10:
        text = "Gebäude 10 - Informatik",
        message = 'Öffnungszeiten:'
        building = 'Building10'
        break;

        case 11:
        text = "Gebäude 11 - Informatik",
        message = 'Öffnungszeiten:'
        building = 'Building11'
        break;

        case 12:
        text = "Gebäude 12 - Informatik",
        message = 'Öffnungszeiten:'
        building = 'Building12'
        break;

        case 13:
        text = "Gebäude 13 - Informatik",
        message = 'Öffnungszeiten:'
        building = 'Building13'
        break;
    }
        Alert.alert(
          
            text,
            message,
            [
                {text: 'Cancel', onPress:() => console.log("Cancel")},
                {text: 'Go In', onPress:() => this.props.navigation.navigate(building)} //this.navigation.navigate(building) <-- zum verliken auf die gebäuden
            
            ]
          )
        
    }
    
    myBuilding = () =>{
        this.hideMenu();
        //let userBuilding = '' //get users Building
        this.props.navigation.navigate('building9entrance')

    }

    _menu = null;
 
  setMenuRef = ref => {
    this._menu = ref;
  };
 
  hideMenu = () => {

    this._menu.hide();
  };

    showSettings = () => {
        this._menu.hide();
        this.props.navigation.navigate('settings')
    };


  showMenu = () => {
    this._menu.show();
  };

  
    selectedSearchItem(item){
        this.setState({
            region:{latitude: 48.483059, longitude: 9.187477, latitudeDelta: 0.007,longitudeDelta: 0.0025}
        })
        //alert( JSON.stringify(item) );
    }

onMapLayout = () => {
    this.setState({ isMapReady: true });
  }




    render(){
        return (
            <View style={styles.contentView} key={this.state.uniqueValue}>
                <SearchableDropdown
                onTextChange={text => this.searchbar(text)}
                onItemSelect={item => this.selectedSearchItem(item)}
                containerStyle={{ padding: 5 }}
                textInputStyle={{
                padding: 12,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                }}
                itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: '#ddd',
                borderColor: '#bbb',
                borderWidth: 1,
                borderRadius: 5,
                }}
                itemTextStyle={{ color: '#222' }}
                items={this.state.searchBar}
                defaultIndex={2}
                placeholder="search"
                resetValue={false}
                underlineColorAndroid="transparent"
                />
                <ImageBackground style={{width: '100%', height: '100%'}}>
                    <View style={styles.contentView} key={this.state.uniqueValue}>
                                                        <MapView

                                                            style={styles.map}
                                                            region={this.state.region}
                                                            rotateEnabled={false}
                                                            mapType={"hybrid"}
                                                            maxDelta={0.0035}
                                                            showsBuildings={true}
                                                            showsUserLocation={true}
                                                            onLayout={this.onMapLayout}
                                                        >
                                                            <Polygon
                                                                coordinates={this.buildings[1]}
                                                                strokeColor={"rgba(0,0,0,0.01)"}
                                                                tappable={true}
                                                                onPress={(number)=>  this.clickBuilding(1)}
                                                            ></Polygon>
                                                            <Polygon
                                                                coordinates={this.buildings[2]}
                                                                strokeColor={"rgba(0,0,0,0.01)"}
                                                                tappable={true}
                                                                onPress={(number)=>  this.clickBuilding(2)}
                                                            ></Polygon>
                                                            <Polygon
                                                                coordinates={this.buildings[3]}
                                                                strokeColor={"rgba(0,0,0,0.01)"}
                                                                tappable={true}
                                                                onPress={(number)=>  this.clickBuilding(3)}
                                                            ></Polygon>
                                                            <Polygon
                                                                coordinates={this.buildings[4]}
                                                                strokeColor={"rgba(0,0,0,0.01)"}
                                                                tappable={true}
                                                                onPress={(number)=>  this.clickBuilding(4)}
                                                            ></Polygon>
                                                            <Polygon
                                                                coordinates={this.buildings[5]}
                                                                strokeColor={"rgba(0,0,0,0.01)"}
                                                                tappable={true}
                                                                onPress={(number)=>  this.clickBuilding(5)}
                                                            ></Polygon>
                                                            <Polygon
                                                                coordinates={this.buildings[7]}
                                                                strokeColor={"rgba(0,0,0,0.01)"}
                                                                tappable={true}
                                                                onPress={(number)=>  this.clickBuilding(7)}
                                                            ></Polygon>
                                                            <Polygon
                                                                coordinates={this.buildings[9]}
                                                                strokeColor={"rgba(0,0,0,0.01)"}
                                                                tappable={true}
                                                                onPress={(number)=>  this.clickBuilding(9)}
                                                            >
                                                            </Polygon>
                                                        </MapView>
                                                    </View>
                                                    </ImageBackground>
                                                      </View>
        )
    }
}

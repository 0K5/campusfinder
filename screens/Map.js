//init maps
import React, { Component } from 'react';
import MapView, {Callout, Polygon,LatLng } from 'react-native-maps';
import {Text, View, StyleSheet,Button,TextInput, TouchableHighlight,TouchableOpacity, Image, Alert} from 'react-native';
import SwipeUpDown from 'react-native-swipe-up-down';
import { Col, Row, Grid } from "react-native-easy-grid";
//import ReactNativeTooltipMenu from 'react-native-tooltip-menu';
import Menu, { MenuItem } from 'react-native-material-menu';

const styles= StyleSheet.create({
    map:{
        left:0,
        right:0,
        bottom:0,
        top:'14%',
        position: 'absolute'
    },
    contentView:{
        left:0,
        right:0,
        bottom:0,
        top:'12%',
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

export default class Map extends Component {
    constructor(props) {
            super(props);
        this.state = {
            region:{latitude: 48.482522, longitude: 9.187809, latitudeDelta: 0.007,longitudeDelta: 0.0025},
            uniqueValue:1
        };
    }

    //Buildings of the Campus with corner-coordinates

    Buidling20=[]
    Buidling18=[]
    Buidling17=[]
    Buidling16=[]
    Buidling15=[]
    Buidling14=[]
    Buidling13=[]
    Buidling12=[]
    Building11=[]
    Building10=[]
    Building9=[{ latitude:48.482729,longitude:9.187737},{latitude:48.483038,longitude:9.186901},{latitude:48.483379,longitude:9.187196},{latitude:48.483067,longitude:9.188027}]
    Buidling8=[]
    Building7=[{latitude:48.481881,longitude:9.188568},{latitude:48.481959,longitude:9.188364},{latitude:48.482037,longitude:9.188402},{latitude:48.482091,longitude:9.188318},{latitude:48.482159,longitude:9.188375},{latitude:48.482235,longitude:9.188173},{latitude:48.482556,longitude:9.188441},{latitude:48.482524,longitude:9.188585},{latitude:48.482624,longitude:9.188696},{latitude:48.482451,longitude:9.189172}]
    Building6=[]
    Building5=[{ latitude:48.482695,longitude:9.185688},{latitude:48.482849,longitude:9.185825},{latitude:48.482825,longitude:9.186321},{latitude:48.482661,longitude:9.186759},{latitude:48.482515, longitude:9.186638},{latitude:48.482507, longitude:9.186238}]
    Building4=[{ latitude:48.481727,longitude:9.187106},{latitude:48.481874,longitude:9.187232},{latitude:48.481719,longitude:9.187659},{latitude:48.481471,longitude:9.187844},{latitude:48.481326, longitude:9.187710},{latitude:48.481471, longitude:9.187267}]
    Building3=[{ latitude:48.482166,longitude:9.186438},{latitude:48.482307,longitude:9.186560},{latitude:48.482205,longitude:9.186849},{latitude:48.482239,longitude:9.186891},{latitude:48.482188, longitude:9.187019},{latitude:48.482018, longitude:9.186880},{latitude:48.481905, longitude:9.187170},{latitude:48.481761, longitude:9.187023},{latitude:48.481859, longitude:9.186737},{latitude:48.481834, longitude:9.186700},{latitude:48.481878, longitude:9.186571}]
    Building2=[{ latitude:48.482325,longitude:9.185384},{latitude:48.482518,longitude:9.185527},{latitude:48.482499,longitude:9.186062},{latitude:48.482339,longitude:9.186492},{latitude:48.482193, longitude:9.186353},{latitude:48.482114, longitude:9.185919}]
    Building1=[{latitude:48.480741,longitude:9.184611},{latitude:48.480890,longitude:9.184191},{latitude:48.481040,longitude:9.184325},{latitude:48.481086,longitude:9.184217},{latitude:48.481338,longitude:9.184442},{latitude:48.481404, longitude:9.184330},{latitude:48.481678, longitude:9.184569},{latitude:48.481607,longitude:9.184767},{latitude:48.481829,longitude:9.184999},{latitude:48.481680,longitude:9.185418},{latitude:48.481619,longitude:9.185370},{latitude:48.481473,longitude:9.185740},{latitude:48.481335,longitude:9.185649},{latitude:48.481296,longitude:9.185745},{latitude:48.481182,longitude:9.185514},{latitude:48.480940,longitude:9.185289},{latitude:48.480968,longitude:9.185203},{latitude:48.480840,longitude:9.185069
        },{latitude:48.480940,longitude:9.184796},{latitude:48.480741,longitude:9.184615}]


        


    static navigationOptions = ({navigation})=>  {
        return{
        headerRight:
            <TouchableHighlight onPress={() => navigation.navigate('settings',{props:this.props})}>
                <Image style={styles.headerImage} source={require('../img/settings.png')} />
            </TouchableHighlight>,
        headerLeft:
            <TouchableHighlight onPress={() => navigation.navigate('profile',{props:this.props})}>
                <Image style={styles.headerImage} source={require('../img/profile.png')} />
            </TouchableHighlight>
        }}

      
    iconClicked = () =>{
        this.props.navigation.navigate('Signin');
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

    render(){


        return(
            <View style={styles.contentView} key={this.state.uniqueValue}>
                

                <View style={styles.button}>
                <Menu
                    
                    ref={this.setMenuRef}
                    button={<Text style={{textAlign:'center',marginTop:'3%'}}  onPress={this.showMenu}>Show menu</Text>}
                >
          <MenuItem onPress={this.myBuilding}>My Building</MenuItem>
          <MenuItem onPress={this.hideMenu}>Events</MenuItem>
          <MenuItem onPress={this.hideMenu}>Parking</MenuItem>
          <MenuItem onPress={this.showSettings}>Settings</MenuItem>
        </Menu>
      </View>
            
      <View style={styles.calloutView} >
                <TextInput style={styles.calloutSearch}
                            placeholder={"Search"}
                />
                </View>
      <MapView
                style={styles.map}
                region={this.state.region}
                rotateEnabled={false}
                mapType={"hybrid"}
                maxDelta={0.0035}
                showsBuildings={true}
                showsUserLocation={true}
                
             >

            <Polygon
                coordinates={this.Building1}
                strokeColor={"rgba(0,0,0,0.01)"}
                tappable={true}
                onPress={(number)=>  this.clickBuilding(1)}
             ></Polygon>
             <Polygon
                coordinates={this.Building2}
                strokeColor={"rgba(0,0,0,0.01)"}
                tappable={true}
                onPress={(number)=>  this.clickBuilding(2)}
             ></Polygon>
             <Polygon
                coordinates={this.Building3}
                strokeColor={"rgba(0,0,0,0.01)"}
                tappable={true}
                onPress={(number)=>  this.clickBuilding(3)}
             ></Polygon>
            <Polygon
                coordinates={this.Building4}
                strokeColor={"rgba(0,0,0,0.01)"}
                tappable={true}
                onPress={(number)=>  this.clickBuilding(4)}
             ></Polygon>
             <Polygon
                coordinates={this.Building5}
                strokeColor={"rgba(0,0,0,0.01)"}
                tappable={true}
                onPress={(number)=>  this.clickBuilding(5)}
             ></Polygon>
            <Polygon
                coordinates={this.Building7}
                strokeColor={"rgba(0,0,0,0.01)"}
                tappable={true}
                onPress={(number)=>  this.clickBuilding(7)}
             ></Polygon>
            <Polygon
                
                coordinates={this.Building9}
                strokeColor={"rgba(0,0,0,0.01)"}
                tappable={true}
                onPress={(number)=>  this.clickBuilding(9)}
                
             >
            
             </Polygon>


         
             </MapView>

            </View>
        )
    }
}

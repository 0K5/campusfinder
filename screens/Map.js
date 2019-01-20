//init maps
import React, { Component } from 'react';
import MapView, {Callout, Polygon,LatLng, Marker} from 'react-native-maps';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { ImageBackground, Text, View, StyleSheet,Button,TextInput, TouchableHighlight,TouchableOpacity, Image, Alert,AsyncStorage, ActivityIndicator} from 'react-native';
import SwipeUpDown from 'react-native-swipe-up-down';
import { Col, Row, Grid } from "react-native-easy-grid";
//import ReactNativeTooltipMenu from 'react-native-tooltip-menu';
import Menu, { MenuItem } from 'react-native-material-menu';

import Urls from '../constants/Urls';
import { prevAuthCall, endpointCall } from '../services/Rest';
import { sendTrackingRequest, NotificationReceiver } from '../services/Notification';


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

export default class Map extends Component {
    state = {
        isLoaded: false,
        uniqueValue:1 ,
        searchBar : [
        ],
        markerLatLng:{
            latitude:0.000000,
            longitude:0.000000
        },
        tracking:false
    }
    
    constructor(props){
        super(props);
        
    

     }


      
     
    

    //Buildings of the Campus with corner-coordinates

    buildingsLoad(){
        AsyncStorage.getItem('buildingPolys').
        then(bpstring => {
        if(bpstring){
            let buildingstemp=[];
          bpstring = bpstring == null ? {} : JSON.parse(bpstring)
          for(i = 0; i<bpstring.length; i++){
            let num = parseInt(bpstring[i].building.replace(/[^\d.]/g, '' ));
            if( buildingstemp[num] != undefined){
                buildingstemp[num].push({latitude: parseFloat(bpstring[i].latitude),longitude: parseFloat(bpstring[i].longitude)});
            }else{
                buildingstemp[num] = [];
                buildingstemp[num].push({latitude: parseFloat(bpstring[i].latitude),longitude: parseFloat(bpstring[i].longitude)});
            }
          
          }
            this.setState({"buildingspoly": buildingstemp});
        }
        this.setState({isLoaded: true,
            region:{latitude: 48.481725,     longitude: 9.186295 ,   latitudeDelta: 0.007, longitudeDelta: 0.005},
        });
        
      });
      AsyncStorage.getItem('buildings').
        then(bpstring => {
        if(bpstring){
          let buildingstemp2=[];
          bpstring = bpstring == null ? {} : JSON.parse(bpstring)
          //console.log("BUILDINGS: ----------------------------------------------------------------")
          //console.log(bpstring)
          for(i = 0; i<bpstring.length; i++){
            let num2 = parseInt(bpstring[i].name.replace(/[^\d.]/g, '' ));
            console.log(bpstring[i].location.latitude)
                buildingstemp2[num2] = {latitude: parseFloat(bpstring[i].location.latitude),longitude: parseFloat(bpstring[i].location.longitude),
                    latitudeDelta: parseFloat(bpstring[i].location.latitudeDelta),longitudeDelta: parseFloat(bpstring[i].location.longitudeDelta)};
          }
          this.setState({"buildings": buildingstemp2});
        }
        
      });
    }

    componentWillMount() {
        this.buildingsLoad();
    }

        


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

  // ================================ OLI ============================================

    trackUser(receiver){
        let mapComp = this;
        this.tracker = setInterval(() => {
            AsyncStorage.getItem(receiver)
            .then(locationString => {
                console.log("MAP.TRACKUSER LOCSTRING: " +locationString)
                if(locationString == 'done' || !this.state.tracking){
                    mapComp.setState({markerLatLng:{latitude:0.000000,longitude:0.000000}});
                    AsyncStorage.removeItem(receiver)
                    .then(() => {
                        mapComp.setState({tracking: false})
                        clearInterval(mapComp.tracker);
                    })
                }else{
                    location = JSON.parse(locationString)
                    if(location.hasOwnProperty('latitude')){
                        markerLatLng = {
                            'markerLatLng' : {
                                'latitude' : location.latitude,
                                'longitude' : location.longitude
                            }
                        }
                        mapComp.setState({tracking: true})
                        mapComp.setState(markerLatLng);
                    }
                }
            }).catch(error => console.log(error));
        }, 2000);
    }

    showInfoPopup(response){
        res = ""
        for(key in response){
            res += key + ": " + response[key] + "\n";
        }
        return Alert.alert("Info",
            res
        )
    }

    searchProfilePopup(receiver, isTracking) {
        let mapTh = this;
        if(this.state.isTrackingAllowed && isTracking && !this.state.tracking){
            sendTrackingRequest(receiver);
            mapTh.setState({tracking : true});
            AsyncStorage.setItem(receiver, JSON.stringify({longitude:0.000000,latitude:0.000000}))
            .then(rec => {
                mapTh.setState({trackedUser: receiver});
                mapTh.trackUser(receiver);
            })
        }else{
            endpointCall(this.showInfoPopup,Urls.profileinfo,{email:receiver})
        }
    }

    getBuildingOrRoom(cb, buildingRoomName){
        AsyncStorage.getItem('buildings')
        .then(buildingsString => {
            let found = false;
            buildings = JSON.parse(buildingsString);
            for(key in buildings){
                if(buildings[key].name == buildingRoomName){
                    found = true;
                    return cb(buildings[key])
                }
            }
            if(!found){
                AsyncStorage.getItem('rooms')
                .then(roomsString => {
                    let res = undefined
                    rooms = JSON.parse(roomsString);
                    for(key in rooms){
                        if(rooms[key].name == buildingRoomName){
                            return cb(rooms[key])
                        }
                    }
                }).catch(error => console.log(error));
            }
        }).catch(error => console.log(error));
    }

    searchBuildingRoomPopup(buildingRoomName, isTracking){
        let sbrpThis = this;
        if(isTracking){
            let trackBuildingOrRoom = function(buildingOrRoom){
                let building = buildingOrRoom;
                if(buildingOrRoom.hasOwnProperty("building")){
                    building = buildingOrRoom.building;
                }
                sbrpThis.setState({
                    'markerLatLng':{
                        'latitude':parseFloat(building.location.latitude),
                        'longitude':parseFloat(building.location.longitude)
                    }});
                sbrpThis.setState({'tracking' : true});
            };
            sbrpThis.getBuildingOrRoom(trackBuildingOrRoom, buildingRoomName);
        }else{
            let createInfo = function(buildingOrRoom){
                console.log(buildingOrRoom)
                res = {}
                if(buildingOrRoom.hasOwnProperty("building")){
                    res['Room'] = buildingOrRoom.name;
                    res['In building'] = buildingOrRoom.building.name;
                    if(buildingOrRoom.building.hasOwnProperty('faculty')){
                        res['Faculty'] = buildingOrRoom.building.faculty.name;
                    }
                    if(buildingOrRoom.building.hasOwnProperty('department')){
                        res['Department'] = buildingOrRoom.building.department.name;
                    }
                }else{
                    res['Building'] = buildingOrRoom['name'];
                    if(buildingOrRoom.hasOwnProperty('faculty')){
                        res['Faculty'] = buildingOrRoom.faculty.name;
                    }
                    if(buildingOrRoom.hasOwnProperty('department')){
                        res['Department'] = buildingOrRoom.department.name;
                    }
                }
                sbrpThis.showInfoPopup(res);
            }
            sbrpThis.getBuildingOrRoom(createInfo, buildingRoomName);
        }

    }

    getSearchItemAndDoAction = (item, isTracking) => {
        let mapTh = this;
        let search = this.state.search;
        let receiver = undefined;
        let name = undefined;
        for(category in search){
            for(val in search[category]){
                if(search[category][val].email && search[category][val].email == item.name){
                    receiver = search[category][val].email
                }else if(search[category][val].name && search[category][val].name == item.name){
                    name = search[category][val].name
                }
            }
        }
        if(receiver){
            mapTh.searchProfilePopup(receiver, isTracking);
        }
        if(name){
            mapTh.searchBuildingRoomPopup(name, isTracking);
        }
    }

    selectedSearchItem = (item) => {
        AsyncStorage.getItem('settings')
        .then(settingsString => {
            let settings = JSON.parse(settingsString);
            this.setState({
                'isTrackingAllowed' : settings.isTracking && settings.isNotification
            })
            if(this.state.isTrackingAllowed){
                Alert.alert(
                    'What do you want to do',
                    'with '+item.name,
                    [
                        {text: 'Get Info', onPress: () => this.getSearchItemAndDoAction(item, false), style: 'cancel'},
                        {text: 'Track', onPress: () => this.getSearchItemAndDoAction(item, true), style: 'cancel'}
                    ],
                    { cancelable: true }
                );
            }else{
                Alert.alert(
                    'What do you want to do',
                    'with '+item.name+ "\n(Info: for tracking please activate notifications and tracking in settings menu)",
                    [
                        {text: 'Get Info', onPress: () => this.getSearchItemAndDoAction(item, false), style: 'cancel'}
                    ],
                    { cancelable: true }
                );
            }
        });
    }

    cancelTracking = () => {
        let cancelledTracking = (response, data) => {
            this.setState({trackedUser:""});
            this.setState({tracking:false});
            this.setState({markerLatLng:{latitude:0.000000,longitude:0.000000}});
        }
        let receiver = this.state.trackedUser;
        endpointCall(cancelledTracking, Urls.trackingAbort, {'receiver':receiver});
    }
// =============================== OLI END ==================================================

/*    selectedSearchItem(item){
        num = parseInt(item.name.replace(/[^\d.]/g, '' ));
        if(num <10 && num >0){
            this.setState({
                region: this.state.buildings[num]
            })
        }else{
            alert( JSON.stringify(item) );
        }
       
        
    }*/

onMapLayout = () => {
    this.setState({ isMapReady: true });
  }



    render(){ if (!this.state.isLoaded) {
        return (
            <ActivityIndicator {...this.props}/>
        );
    }else{
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
                            <Marker
                                coordinate={this.state.markerLatLng}
                            />
                            <Polygon
                                coordinates={this.state.buildingspoly[1]}
                                strokeColor={"rgba(0,0,0,0.01)"}
                                tappable={true}
                                onPress={(number)=>  this.clickBuilding(1)}
                            ></Polygon>
                            <Polygon
                                coordinates={this.state.buildingspoly[2]}
                                strokeColor={"rgba(0,0,0,0.01)"}
                                tappable={true}
                                onPress={(number)=>  this.clickBuilding(2)}
                            ></Polygon>
                            <Polygon
                                coordinates={this.state.buildingspoly[3]}
                                strokeColor={"rgba(0,0,0,0.01)"}
                                tappable={true}
                                onPress={(number)=>  this.clickBuilding(3)}
                            ></Polygon>
                            <Polygon
                                coordinates={this.state.buildingspoly[4]}
                                strokeColor={"rgba(0,0,0,0.01)"}
                                tappable={true}
                                onPress={(number)=>  this.clickBuilding(4)}
                            ></Polygon>
                            <Polygon
                                coordinates={this.state.buildingspoly[5]}
                                strokeColor={"rgba(0,0,0,0.01)"}
                                tappable={true}
                                onPress={(number)=>  this.clickBuilding(5)}
                            ></Polygon>
                            <Polygon
                                coordinates={this.state.buildingspoly[7]}
                                strokeColor={"rgba(0,0,0,0.01)"}
                                tappable={true}
                                onPress={(number)=>  this.clickBuilding(7)}
                            ></Polygon>
                            <Polygon
                                coordinates={this.state.buildingspoly[9]}
                                strokeColor={"rgba(0,0,0,0.01)"}
                                tappable={true}
                                onPress={(number)=>  this.clickBuilding(9)}
                            >
                            </Polygon>
                        </MapView>
                        { this.state.tracking &&
                        <View style={styles.contentView}>
                            <Button
                                onPress={this.cancelTracking}
                                title="Cancel Tracking"
                            />
                        </View>
                        }
                    </View>
                </ImageBackground>
                </View>
        )
    }
}
}

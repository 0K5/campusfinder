//init maps
import React, { Component } from 'react';
import MapView, {Callout, Polygon,LatLng, Marker} from 'react-native-maps';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {  ImageBackground, Text, View, StyleSheet,Button,TextInput, TouchableHighlight,TouchableOpacity, Image, Alert,AsyncStorage} from 'react-native';
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
        //Generic stuff
        isLoaded : false,
        uniqueValue:1 ,
        viewInit : {
            latitude: 48.481725,
            longitude: 9.186295,
            latitudeDelta: 0.007,
            longitudeDelta: 0.005
        },
        region:{
            latitude: 48.481725,
            longitude: 9.186295,
            latitudeDelta: 0.007,
            longitudeDelta: 0.005
        },
        //UserInfos loaded after mount
        profile: {},
        settings: {},
        //BuildingPolygons
        buildings : {},
        mapBuildingPolygones : {},
        //Searchbar stuff
        searchBarItems : [],
        searchResults: [],
        //Tracking stuff
        isTracking : false,
        isData: false,
        markerLatLng : {
            latitude: 0.000000,
            longitude: 0.000000
        }
    }

    constructor(props){
        super(props);
    }

    componentWillMount(){
        console.log("MAP COMPONENT DID MOUNT");
        let cThis = this;
        let setFinalStates = (polygons) => {
            console.log("MAP BUILDINGPOLYS LOADED");
            cThis.setState({mapBuildingPolygones:polygons});
            cThis.setState({isLoaded:true});
            console.log("MAP LOADED");
        }
        let loadPolys = () => {
            console.log("MAP BUILDINGS LOADED");
            AsyncStorage.getItem('buildingPolys')
            .then(buildingPolysString => {
                let buildingPolys = JSON.parse(buildingPolysString);
                if(buildingPolys){
                    let polygons = {}
                    for(let i in buildingPolys){
                        let building = buildingPolys[i].building
                        if (!polygons.hasOwnProperty(building)){
                             polygons[building] = [];
                        }
                        polygons[building].push({
                            longitude : parseFloat(buildingPolys[i].longitude),
                            latitude : parseFloat(buildingPolys[i].latitude)
                        });
                    }
                    setFinalStates(polygons);
                }
            });
        }
        let loadBuildings = () => {
            console.log("MAP SETTINGS LOADED");
            AsyncStorage.getItem('buildings')
            .then(buildingsString => {
                let buildings = JSON.parse(buildingsString);
                if(buildings){
                    let tmpBuildings = {};
                    for(let b in buildings){
                        tmpBuildings[buildings[b].name] = buildings[b];
                    }
                    cThis.setState({
                        buildings : tmpBuildings
                    })
                    loadPolys();
                }
            });
        }
        let loadSettings = () => {
            console.log("MAP PROFILE LOADED");
            AsyncStorage.getItem('settings')
            .then(settingsString => {
                let settings = JSON.parse(settingsString);
                if(settings){
                    cThis.setState({
                        settings : settings
                    });
                    loadBuildings();
                }
            });
        }
        AsyncStorage.getItem('profile')
        .then(profileString => {
            let profile = JSON.parse(profileString)
            if (profile){
                cThis.setState({
                    profile : profile,
                });
                loadSettings();
            }
        });
    }

    screenreloading = () =>{
        this.setState(({uniqueValue}) => ({
            uniqueValue: uniqueValue +1
        }));
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
        }
    }

    iconClicked = () =>{
        this.props.navigation.navigate('signin');
    }

    setUpBuildingPolys(buildingPolys){
        let polygons = {}
        for(let i in buildingPolys){
            let building = buildingsPolys[i].building
            if (!polygons.hasOwnProperty(building)){
                 polygons[building] = [];
            }
            polygons[building].push({
                longitude : buildingsPolys[i].longitude,
                latitude : buildinsPolys[i].latitude
            });
        }
        this.setState({mapBuildingPolygones:polygons});
        this.setState({isLoaded:true});
        console.log("MAP LOADED");
    }

    search = (event) => {
        mapWin = this
        if(event.length <= 1){
            mapWin.setState({'searchBar':[]})
        }else{
            let searchResponse = function(response){
                let res = {};
                let searchBarItems = [];
                let id = 0;
                for(key in response){
                    res[key] = [];
                    for(item in response[key]){
                        res[key].push(response[key][item]);
                        if(response[key][item].hasOwnProperty('name')){
                            searchBarItems.push({'name': response[key][item].name, 'id' : id})
                            id = id + 1;
                        }else{
                            searchBarItems.push({'name': response[key][item].email, 'id' : id})
                            id = id + 1;
                        }
                    }
                    mapWin.setState({'searchResults':res})
                    mapWin.setState({'searchBarItems':searchBarItems})
                }
            };
            endpointCall(searchResponse, Urls.search,{ "search": event })
        }
    }

    zoomLocation = (cb, goalView) => {
        let zoomTimeInMillis = 1000
        let fac = zoomTimeInMillis/25
        let zLThis = this;
        let origRegion = this.state.region;
        let gLat = parseFloat(goalView.latitude) > origRegion.latitude ? (parseFloat(goalView.latitude)-origRegion.latitude)/fac : (origRegion.latitude-parseFloat(goalView.latitude))/fac;
        let gLon = parseFloat(goalView.longitude) > origRegion.longitude ? (parseFloat(goalView.longitude)-origRegion.longitude)/fac : (origRegion.longitude-parseFloat(goalView.longitude))/fac;
        let gLatD = parseFloat(goalView.latitudeDelta) > origRegion.latitudeDelta ? (parseFloat(goalView.latitudeDelta)-origRegion.latitudeDelta)/fac : (origRegion.latitudeDelta-parseFloat(goalView.latitudeDelta))/fac;
        let gLonD = parseFloat(goalView.longitudeDelta) > origRegion.longitudeDelta ? (parseFloat(goalView.longitudeDelta)-origRegion.longitudeDelta)/fac : (origRegion.longitudeDelta-parseFloat(goalView.longitudeDelta))/fac;
        let cnt = 0;
        let zoom = setInterval(() => {
            if(cnt < fac){
                let tmpRegion = this.state.region;
                zLThis.setState({region: {
                    latitude : goalView.latitude <= origRegion.latitude ? tmpRegion.latitude - gLat : tmpRegion.latitude + gLat,
                    longitude : goalView.longitude <= origRegion.longitude ? tmpRegion.longitude - gLon : tmpRegion.longitude + gLon,
                    latitudeDelta : goalView.latitudeDelta <= origRegion.latitudeDelta ? tmpRegion.latitudeDelta - gLatD : tmpRegion.latitudeDelta + gLatD,
                    longitudeDelta : goalView.longitudeDelta <= origRegion.longitudeDelta ? tmpRegion.longitudeDelta - gLonD : tmpRegion.longitudeDelta + gLonD
                }});
                cnt = cnt + 1;
            }else{
                clearInterval(zoom);
                cb()
            }
        }, 25);
    }

    clickBuilding =(buildingName) =>{
        console.log("MAP CLICKED ON BUILDING " + buildingName);
        let cBThis = this;
        let zoomedOut = () => {
            cBThis.setState({region : this.state.viewInit});
        }
        let afterZoom = () => {
            Alert.alert(
                cBThis.state.buildings[buildingName].description,
                cBThis.state.buildings[buildingName].message,
                [
                {text: 'Cancel', onPress:() => {cBThis.zoomLocation(zoomedOut, cBThis.state.viewInit)}},
                {text: 'Go In', onPress:() => {cBThis.props.navigation.navigate(buildingName)}}
                ]
            )
        }
        let buildingZoomLoc = this.state.buildings[buildingName].location;
        this.zoomLocation(afterZoom, buildingZoomLoc);
    }

    trackUser(receiver){
        let mapComp = this;
        this.tracker = setInterval(() => {
            AsyncStorage.getItem(receiver)
            .then(locationString => {
                console.log("MAP.TRACKUSER LOCSTRING: " +locationString)
                if(locationString == 'done' || !this.state.isTracking){
                    mapComp.setState({markerLatLng:{latitude:0.000000,longitude:0.000000}});
                    AsyncStorage.removeItem(receiver)
                    .then(() => {
                        mapComp.setState({isTracking: false})
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
                        mapComp.setState({isTracking: true})
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
        if(this.state.isTrackingAllowed && isTracking && !this.state.isTracking){
            sendTrackingRequest(receiver);
            mapTh.setState({isTracking : true});
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
                sbrpThis.setState({'isTracking' : true});
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
            this.setState({isTracking:false});
            this.setState({markerLatLng:{
                latitude:0.000000,
                longitude:0.000000
                }
            });
        }
        let receiver = this.state.trackedUser;
        endpointCall(cancelledTracking, Urls.trackingAbort, {'receiver':receiver});
    }
// =============================== OLI END ==================================================

    render(){
        if(!this.state.isLoaded){
            return (
                <Image
                    source={require('../assets/images/splash.png')}
                ></Image>
            );
        }else{
            return (
                <View style={styles.contentView} key={this.state.uniqueValue}>
                    <SearchableDropdown
                        onTextChange={text => this.search(text)}
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
                        items={this.state.searchBarItems}
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
                                    coordinates={this.state.mapBuildingPolygones['building1']}
                                    strokeColor={"rgba(0,0,0,0.01)"}
                                    tappable={true}
                                    onPress={()=>  this.clickBuilding('building1')}
                                ></Polygon>
                                <Polygon
                                    coordinates={this.state.mapBuildingPolygones['building2']}
                                    strokeColor={"rgba(0,0,0,0.01)"}
                                    tappable={true}
                                    onPress={()=>  this.clickBuilding('building2')}
                                ></Polygon>
                                <Polygon
                                    coordinates={this.state.mapBuildingPolygones['building3']}
                                    strokeColor={"rgba(0,0,0,0.01)"}
                                    tappable={true}
                                    onPress={()=>  this.clickBuilding('building3')}
                                ></Polygon>
                                <Polygon
                                    coordinates={this.state.mapBuildingPolygones['building4']}
                                    strokeColor={"rgba(0,0,0,0.01)"}
                                    tappable={true}
                                    onPress={()=>  this.clickBuilding('building4')}
                                ></Polygon>
                                <Polygon
                                    coordinates={this.state.mapBuildingPolygones['building5']}
                                    strokeColor={"rgba(0,0,0,0.01)"}
                                    tappable={true}
                                    onPress={()=>  this.clickBuilding('building5')}
                                ></Polygon>
                                <Polygon
                                    coordinates={this.state.mapBuildingPolygones['building7']}
                                    strokeColor={"rgba(0,0,0,0.01)"}
                                    tappable={true}
                                    onPress={()=>  this.clickBuilding('building7')}
                                ></Polygon>
                                <Polygon
                                    coordinates={this.state.mapBuildingPolygones['building9']}
                                    strokeColor={"rgba(0,0,0,0.01)"}
                                    tappable={true}
                                    onPress={()=>  this.clickBuilding('building9')}
                                >
                                </Polygon>
                            </MapView>
                        </View>
                        { this.state.isTracking &&
                        <View style={styles.contentView}>
                            <Button
                                onPress={this.cancelTracking}
                                title="Cancel Tracking"
                            />
                        </View>
                        }
                    </ImageBackground>
                </View>
            )
        }
    }
}

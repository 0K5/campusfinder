//init settings
import React, { Component } from 'react';
import SwitchToggle from 'react-native-switch-toggle';
import { StyleSheet,Text,View,ScrollView,AsyncStorage } from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import {saveData} from '../services/RestSaverTmp';



const styles = StyleSheet.create({
  heading:{
    fontSize: 35,
    marginTop: 30,
    textAlign: 'center'
  },
  container:{
    flex:8,
    borderTopColor: 'grey',
    borderTopWidth: 1,
  },
  row:{
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginLeft:'15%', 
    marginTop:25,
    marginBottom: 15
  },
  text:{
    fontSize:20,
    fontWeight:'200'
  },
  text2:{
    fontSize:20,
    fontWeight:'200',
    marginTop: 25,
    marginLeft: '10%',
  },
  dropdown:{
    marginLeft: '10%',
    width:'75%',
  },
  dropdown2:{
    marginLeft: '10%',
    width:'75%',
    marginBottom: 70,
  }
});

export default class Settings extends Component {
  constructor(props){
    super(props);
    this.state = {
    hcms:[],
    facu:[],
    inf:[],
    ac:[],
    esb:[],
    tec:[],
    td:[],
    switchNoti: false,
    switchTrack: false,
    visiValue: "",
    facValue: "",
    courValue: "",
    facValue: "",
    faculty2: [{
      value: '',
    }] 
  }
  
  AsyncStorage.getItem('settingsoptions').
  then(settingsString => {
    if(settingsString){
      settingsString = settingsString == null ? {} : JSON.parse(settingsString)
      for(i = 0; i< settingsString.visibilities.length;i++){
        this.state.hcms[i] ={ value: settingsString.visibilities[i].name };
      }
      for(i = 0; i< settingsString.faculties.length;i++){
        this.state.facu[i] ={ value: settingsString.faculties[i].name };
      }
      for(i = 0; i< settingsString.courses.length;i++){
        switch(settingsString.courses[i].faculty){
        case 'Informatik': this.state.inf.push({ value: settingsString.courses[i].name }); break;
        case 'Angewandte Chemie': this.state.ac.push({ value: settingsString.courses[i].name }); break;
        case 'ESB Business School': this.state.esb.push({ value: settingsString.courses[i].name }); break;
        case 'Technik': this.state.tec.push({ value: settingsString.courses[i].name }); break;
        case 'Textil & Design': this.state.td.push({ value: settingsString.courses[i].name }); break;
        }
        
      }
      console.log("load data");
    }
  });
  
  AsyncStorage.getItem('settings').
    then(settingsString => {
      if(settingsString){
        settingsString = settingsString == null ? {} : JSON.parse(settingsString)
        this.setState({ 
          switchNoti: settingsString['isNotification'],
          switchTrack: settingsString['isTracking'],
          visiValue: settingsString['visibility'],
          facValue: settingsString['faculty'],
          courValue: settingsString['course']
       });
        handleFaculty(settingsString['faculty']);
       // console.log(JSON.stringify(settingsString))
      }
    });
  }

  
  render() {
    console.log("rendern");

    handleFaculty = (event) => {
      this.setState({facValue: event});
      //changeSettings(4,event)
      switch (event){
        case 'Informatik': this.setState({faculty2: this.state.inf}); break;
        case 'Angewandte Chemie': this.setState({faculty2: this.state.ac}); break;
        case 'ESB Business School': this.setState({faculty2: this.state.esb}); break;
        case 'Technik': this.setState({faculty2: this.state.tec}); break;
        case 'Textil & Design': this.setState({faculty2: this.state.td}); break;
      }
  }

   changeSettings = (settingid,setting) => {
    switch (settingid){
      case 0:  saveChange({'all': setting});
                break;
      case 1:  saveChange({'isNotification': setting});
                break;
      case 2: saveChange({'isTracking': setting});
                break; 
      case 3: saveChange({'visibility': setting});
                break; 
      case 4: saveChange({'faculty': setting});
              handleFaculty(setting)
                break; 
      case 5: saveChange({'course': setting});
                break; 
    }

  }
  
  saveChange = (newSetting) => {
    let refreshAsyncStorage = (response, data) => {
      if(response && !response.hasOwnProperty('errorcode')){
         //console.log(JSON.stringify(response));
      }else{
         //console.log(JSON.stringify(response));
      }
    };
    saveData(refreshAsyncStorage, 'settings', newSetting);
  }

    return (
      <ScrollView>
      <View style= {styles.container}>
      <Text style={styles.heading}>
      Settings
     </Text>

     <View style={styles.row}>
        <View style={{ flex: 1, paddingTop: 10}}>
          <Text style={styles.text}>Notifications</Text>
        </View>
        <View style={{ flex: 1, paddingRight: 10 }}>
        <SwitchToggle
          value={this.state.switchNoti}
          switchOn={this.state.switchNoti}
          onPress={this.onPress1}
          
        />
        </View>
      </View>

      <View style={styles.row}>
        <View style={{ flex: 1, paddingTop: 10}}>
          <Text style={styles.text}>Tracking</Text>
        </View>
        <View style={{ flex: 1, paddingRight: 10 }}>
        <SwitchToggle
          value={this.state.switchTrack}
          switchOn={this.state.switchTrack}
          onPress={this.onPress2}
        />
        </View>
      </View>
     
      <Text style={styles.text2 }>Who can see me?</Text>
      <View style={styles.dropdown}>
          <Dropdown
          data={this.state.hcms}
          value={this.state.visiValue} //.getUsersHCSM()
          onChangeText= {(value, index, data) => changeSettings(3,value)}
          />
          </View>
      <Text style={styles.text2 }>Your Faculty</Text>
      <View style={styles.dropdown}>
          <Dropdown
          data={this.state.facu}
          value={this.state.facValue} //.getUsersFAcu()
          onChangeText= {(value, index, data) => changeSettings(4,value)}
          />
          </View> 
       <Text style={styles.text2 }>Your Course</Text>
        <View style={styles.dropdown2}>
          <Dropdown
          data={this.state.faculty2}
          value={this.state.courValue} //.getUsers()
          onChangeText= {(value, index, data) => changeSettings(5,value)}
          />
          </View>      
     </View>
      
    </ScrollView>
    )
    
  }

  onPress1 = () => {
    this.setState({ switchNoti: !this.state.switchNoti });
    changeSettings(1,!this.state.switchNoti)
  }
  onPress2 = () => {
    this.setState({ switchTrack: !this.state.switchTrack });
    changeSettings(2,!this.state.switchTrack)
  }
  
}

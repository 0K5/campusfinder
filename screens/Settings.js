//init settings
import React, { Component } from 'react';
import SwitchToggle from 'react-native-switch-toggle';
import { StyleSheet,Text,View,ScrollView,AsyncStorage } from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import { prevAuthCall, endpointCall } from '../services/Rest';
import Urls from '../constants/Urls';



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
    switchNoti: true,
    switchVisibil: false,
    faculty: "",
    faculty2: [{
      value: '',
    }]
  }

  }
  render() {
    let hcms = [{
      value: 'Everyone',
    },{
      value: 'Friends',
    },{
      value: 'Nobody',
    },{
      value: '#other'
    }]
    let facu = [{
      value: 'Informatik',
    },{
      value: 'Angewandte Chemie',
    },{
      value: 'ESB Business School',
    },{
      value: 'Technik'
    },{
      value: 'Textil & Design'
    }]

    let inf = [{
      value: 'Medien- und Kommunikationsinformatik / Bachelor',
    },{
      value: 'Wirtschaftsinformatik / Bachelor',
    },{
      value: 'Medizintechnische Informatik / Bachelor',
    },{
      value: 'Service Computing / Master',
    },{
      value: 'Human-Centered Computing / Master',
    },{
      value: 'Wirtschaftsinformatik / Master',
    }
  ]

    let ac = [{
      value: 'Angewandte Chemie / Bachelor',
    },{
      value: 'Biomedizinische Wissenschaft / Bachelor',
    },{
      value: 'Angewandte Chemie / Master',
    },{
      value: 'Biomedical Sciences / Master',
    },{
      value: 'Process Analysis & Technology-Management / Master',
    },{
      value: 'Umweltschutz / Master',
    }
  ]

    let esb = [{
      value: 'International Business / Bachelor',
    },{
      value: 'International Operations and Logistics Management / Bachelor',
    },{
      value: 'International Management Double Degree / Bachelor',
    },{
      value: 'Production Management / Bachelor',
    },{
      value: 'Digital Industrial Management and Engineering / Master',
    },{
      value: 'European Management Studies / Master',
    },{
      value: 'International Accounting, Controlling and Taxation / Master',
    },{
      value: 'International Business Development / Master',
    },{
      value: 'International Retail Management / Master',
    },{
      value: 'Strategic Sales Management / Master',
    },{
      value: 'International Purchasing Management / Master',
    },{
      value: 'Consulting & Business Analytics / Master',
    },{
      value: 'International Management / Master',
    },{
      value: 'Operations Management / Master',
    }
  ]

    let tec = [{
      value: 'Maschinenbau / Bachelor',
    },{
      value: 'Mechatronik / Bachelor',
    },{
      value: 'International Project Engineering / Bachelor',
    },{
      value: 'Maschinenbau / Master',
    },{
      value: 'Mechatronik / Master',
    },{
      value: 'Leistungs- und Mikroelektronik / Master',
    },{
      value: 'Dezentrale Energiesysteme und Energieeffizienz / Master',
    },{
      value: 'Technology Management / Master',
    }
  ]

    let td = [{
      value: 'International Fashion Retail / Bachelor',
    },{
      value: 'Textildesign - Modedesign / Bachelor',
    },{
      value: 'Textiltechnologie - Textilmanagement / Bachelor',
    },{
      value: 'Transportation Interior Design / Bachelor',
    },{
      value: 'Interdisziplinäre Produktentwicklung / Master',
    },{
      value: 'Design / Master',
    },{
      value: 'Textile Chain Research / Master',
    }
  ]

    handleFaculty = (event) => {
      this.setState({faculty: event});
      changeSettings(3,event)
      switch (event){
        case 'Informatik': this.setState({faculty2: inf}); break;
        case 'Angewandte Chemie': this.setState({faculty2: ac}); break;
        case 'ESB Business School': this.setState({faculty2: esb}); break;
        case 'Technik': this.setState({faculty2: tec}); break;
        case 'Textil & Design': this.setState({faculty2: td}); break;
      }
  }

  changeSettings = (settingid,setting) => {
    switch (settingid){
      case 0:  saveChange('isNotification', setting);
                break;
      case 1: saveChange('isTracking', setting);
                break; 
      case 2: saveChange('visibility', setting);
                break; 
      case 3: saveChange('faculty', setting);
                break; 
      case 4: saveChange('department', setting);
                break; 
    }

  }
  
  saveChange = (setting, value) => {
    AsyncStorage.getItem('settings').
                then(settingsString => {
                  if(settingsString){
                    let settings = JSON.parse(settingsString)
                    console.log(JSON.stringify(settingsString))
                  settings[setting] = value;
                  AsyncStorage.setItem('settings', JSON.stringify(settings))
                  /* endpointCall( Urls.settings,
                    {setting: value}
                  ); */
                }
                }); 
                
  }

    const {navigation} = this.props
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
          switchOn={this.state.switchVisibil}
          onPress={this.onPress2}
        />
        </View>
      </View>
     
      <Text style={styles.text2 }>Who can see me?</Text>
      <View style={styles.dropdown}>
          <Dropdown
          data={hcms}
          value={'Everyone'} //.getUsersHCSM()
          onChangeText= {(value, index, data) => changeSettings(2,value)}
          />
          </View>
      <Text style={styles.text2 }>Your Faculty</Text>
      <View style={styles.dropdown}>
          <Dropdown
          data={facu}
          value={this.state.faculty} //.getUsersFAcu()
          onChangeText= {(value, index, data) => handleFaculty(value)}
          />
          </View> 
       <Text style={styles.text2 }>Your Department</Text>
        <View style={styles.dropdown2}>
          <Dropdown
          data={this.state.faculty2}
          value={""} //.getUsers()
          onChangeText= {(value, index, data) => changeSettings(4,value)}
          />
          </View>      
     </View>
      
    </ScrollView>
    )
    
  }


  onPress1 = () => {
    this.setState({ switchNoti: !this.state.switchOn1 });
    changeSettings()
  }
  onPress2 = () => {
    this.setState({ switchVisibil: !this.state.switchOn2 });
  }


}

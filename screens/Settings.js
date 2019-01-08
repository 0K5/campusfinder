//init settings
import React, { Component } from 'react';
import SwitchToggle from 'react-native-switch-toggle';
import { StyleSheet,Text,View,ScrollView } from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';



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
    switchOn1: true,
    switchOn2: false,
  }
  

  }
  render() {
    let HCSM = [{
      value: 'Everyone',
    },{
      value: 'Friends',
    },{
      value: 'Nobody',
    },{
      value: '#other'
    }]
    let Facu = [{
      value: 'Informatics',
    },{
      value: 'Applied Chemistry',
    },{
      value: 'ESB Business School',
    },{
      value: 'Engineering'
    },{
      value: 'Textiles & Design'
    }]
    

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
          switchOn={this.state.switchOn1}
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
          switchOn={this.state.switchOn2}
          onPress={this.onPress2}
        />
        </View>
      </View>
     
      <Text style={styles.text2 }>Who can see me?</Text>
      <View style={styles.dropdown}>
          <Dropdown
          data={HCSM}
          value={'Everyone'} //.getUsersHCSM()
          />
          </View>
      <Text style={styles.text2 }>Your Faculty</Text>
      <View style={styles.dropdown}>
          <Dropdown
          data={Facu}
          value={'Informatics'} //.getUsersFAcu()
          onChange={event => {

          }}
          />
          </View> 
       <Text style={styles.text2 }>Your Department</Text>
        <View style={styles.dropdown2}>
          <Dropdown
          data={Facu}
          value={'sdfas'} //.getUsers()
          />
          </View>      
     



        
     </View>
      
    </ScrollView>
    )
    
  }

  onPress1 = () => {
    this.setState({ switchOn1: !this.state.switchOn1 });
  }
  onPress2 = () => {
    this.setState({ switchOn2: !this.state.switchOn2 });
  }
  
  
}

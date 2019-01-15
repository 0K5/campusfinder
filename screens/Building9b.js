//init settings
import React, { Component } from 'react';
import SwitchToggle from 'react-native-switch-toggle';
import { StyleSheet,Text,View,ScrollView,Image } from 'react-native';
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

export default class Building9b extends Component {
  constructor(props){
    super(props);
    this.state = {
    switchOn1: true,
    switchOn2: false,
  }
  // <Text style={styles.heading}>
  //     Building
  //    </Text>

  }
  render() {
    return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
    }}>
    <Text style={styles.heading}>
       text
      </Text>
      <Text style={styles.heading}>
       Building 9 - floor 2
      </Text>
      <Image style={{flex: 1,
              alignSelf: 'stretch',
              resizeMode: 'contain',
              width: undefined,
              height: undefined}} source={require('../img/building9b.png')} />
    </View>
    );
    
   }

  onPress1 = () => {
    this.setState({ switchOn1: !this.state.switchOn1 });
  }
  onPress2 = () => {
    this.setState({ switchOn2: !this.state.switchOn2 });
  }
  
  
}

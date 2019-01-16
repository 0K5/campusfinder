//init settings
import React, { Component } from 'react';
import SwitchToggle from 'react-native-switch-toggle';
import { StyleSheet,Text,View,ScrollView,Image, TouchableHighlight } from 'react-native';
import { Button } from 'react-native';



const styles = StyleSheet.create({
  heading:{
    fontSize: 35,
    marginTop: 30,
    textAlign: 'center'
  },
  headerImage:{
    height: 40,
    width: 40,
    marginTop: 0,
    marginRight: 10
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
    fontWeight:'200',
    textAlign: 'center'
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

export default class Building9entrance extends Component {
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
  
  static navigationOptions = ({navigation})=>  {
    return(
   
          <TouchableHighlight onPress={() => navigation.navigate('building9a')}>
          <View style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
    }}></View>
           <View><Text style={styles.text}>Click Me</Text></View>
          </TouchableHighlight>
      
    
    )}
  render() {
    const {navigate} = this.props.navigation;
    return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
    }}>
    <Button
        title="Go to Floor 0"
        onPress={() => navigate('Building9a', {name: 'Floor 0'})}
      />
    <Text style={styles.heading}>
       Faculty of Informatiks
      </Text>
     
      <Text style={styles.text}>
       Building 9 - hall (floor 1)
      </Text>
      <Image style={{flex: 1,
              alignSelf: 'stretch',
              resizeMode: 'contain',
              width: undefined,
              height: undefined}} source={require('../img/building9entrance.png')} />
      <Button
        title="Go to Floor 2"
        onPress={() => navigate('Building9b', {name: 'Floor 2'})}
      />
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

//init settings
import React, { Component } from 'react';
import SwitchToggle from 'react-native-switch-toggle';
import { StyleSheet,Text,View,ScrollView,Image, TouchableHighlight,Dimensions, ImageBackground } from 'react-native';
import { Button } from 'react-native';



const styles = StyleSheet.create({
  carousel:{
    flex: 1,
    marginTop:20,
    width:this.screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },

  floorimage:{
    flex: 1,
    alignSelf: 'stretch',
    resizeMode: 'contain',
    width: undefined,
    height: undefined
  },
  
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
  },
  button:{
    backgroundColor: 'red',
    width: '20%',
    marginLeft:'50%',
    marginRight:'40%',
    borderRadius: 10,
    marginTop: 100,
    height: 40,
    textAlign:'center'
  }
});

export default class Building9a extends Component {
  constructor(props){
    super(props);
    this.state = {
    switchOn1: true,
    switchOn2: false,
  }
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
    let screenWidth = Dimensions.get("window").width;
    return (

  
      <ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        indicatorStyle='black'
        pagingEnabled={true}
      >
        <View style={{
        flex: 1,
        marginTop:20,
        marginBottom:20,
        width:screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
        }}>
        <Text style={styles.text}>
          Building 9 - UG
        </Text>
         <Image
              style={styles.floorimage} 
              source={require('../img/building9a.png')}
              >
        </Image>
        </View>

        <View style={{
        flex: 1,
        marginTop:20,
        marginBottom:20,
        width:screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
        }}>
         <Text style={styles.text}>
          Building 9 - EG
        </Text>
        <Image
              style={styles.floorimage}
              source={require('../img/building9entrance.png')}
              >
        </Image>
        </View>

        <View style={{
        flex: 1,
        marginTop:20,
        marginBottom:20,
        width:screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
        }}>
         <Text style={styles.text}>
          Building 9 - 1st Floor
        </Text>
        <ImageBackground 
        
              style={styles.floorimage}
              source={require('../img/building9b.png')}

        >     
        <Button style={styles.button}
        
        title='Ma'
        onPress={() => console.log("Pressed")}>
          
        </Button> 
       
        </ImageBackground>
        
    
        </View>

        <View style={{
        flex: 1,
        marginTop:20,
        marginBottom:20,
        width:screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
        }}>
         <Text style={styles.text}>
          Building 9 - 2nd Floor
        </Text>
        <Image
              style={styles.floorimage}
              source={require('../img/building9c.png')}
              >
        </Image>
        </View>

      </ScrollView>
     
    );
    
   }

  onPress1 = () => {
    this.setState({ switchOn1: !this.state.switchOn1 });
  }
  onPress2 = () => {
    this.setState({ switchOn2: !this.state.switchOn2 });
  }
  
  
}

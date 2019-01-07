import React, { Component } from 'react';
import { StyleSheet,Text,TouchableOpacity, View, Image, TextInput } from 'react-native';


const styles = StyleSheet.create({
    login:{
      fontSize: 30
    }
});

export default class TermsAndConditions extends Component {
  render() {
    const {navigation} = this.props
    return (
      <Text style={styles.login}>
      terms and Conditions
    </Text>
     
        
  
      
      
    );
  }
}

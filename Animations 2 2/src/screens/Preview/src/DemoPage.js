import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, TouchableOpacity,Platform,Image } from 'react-native';

import Window from './Window';

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  midContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backBtn:{
    marginLeft: 20,
    marginTop: 20 ,
    width : 80 ,
    height : 40
  },
  button: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#aaa',
    borderWidth: 1,
  },
  header: {
    fontSize: 36,
  },
  text: {
    textAlign: 'center',
    fontSize: 12,
  },
  buttonText: {
    fontSize: 18,
  }
});

class DemoPage extends Component {

  renderBackBtn(){
    if (Platform.OS == 'ios'){
      return(
        <TouchableOpacity style = {styles.backBtn} onPress ={()=> this.props.navigation.goBack()}>
        <Text>BACK</Text></TouchableOpacity>
      )
    }else{
      return(
        <View />
      )
    }
  }

  render() {
    const { number, color, backColor, onSwipe } = this.props;

    return (
      <View style={[styles.container, { backgroundColor: backColor }]}>
      {this.renderBackBtn()}
  <View style={styles.midContainer}>
        <Text style={styles.header}>
          Animation Demo
        </Text>
       <Window />
        <TouchableOpacity style={styles.button} onPress={onSwipe}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
      </View>
    )
  }
}

export default DemoPage;

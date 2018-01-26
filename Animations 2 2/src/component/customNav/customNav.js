/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  View
} from 'react-native';

const {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';

export default class CustomNav extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <View style = {styles.container}>

      <TouchableOpacity style = {styles.btnContainer} onPress = {this.props.openDrawer()}>
     <Icon name="bars" size={30} color="white" />
      </TouchableOpacity>

        <View style = {styles.titleContainer}>
        <Text style = {styles.title}>Rally</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    width : width ,
    height : 64 ,
    backgroundColor:'rgba(116,195,62,1.0)'
  },
  btnContainer :{
    left: 2 ,
    top:20,
    width:50,
    height : 44,
    
  },
  img : {
    width:40,
    height : 30
  },
  titleContainer : {
    position:'absolute',
    left: 50 ,
    width:width-100 ,
    height  : 44 ,
    top : 25,
    alignItems:'center',
    
  },title:{
    fontSize : 22 ,
    fontWeight : 'bold',
    color : 'white'
  }
});

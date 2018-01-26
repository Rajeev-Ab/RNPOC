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

var {
    ARManager
} = require('NativeModules');


const {width , height} = Dimensions.get('window');
import CustomNav from '../../component/customNav/customNav'
export default class ARScreen extends Component {
    constructor(props){
        super(props);
        this.showAR = this.showAR.bind(this);
    }

   

    componentDidMount(){
}

showAR(){
    ARManager.showARKit()
}

    
  render() {
    return (
      <View style={styles.container}>
        <CustomNav  openDrawer = {()=>this.props.openDrawer}/>
        <View style={styles.midContainer}>
        <TouchableOpacity style= {styles.btnContainer} onPress={()=> this.showAR()}>
        <Text style={styles.hintText}>Show AR</Text>
        </TouchableOpacity>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
   
  },
  midContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  busImgContainer:{
    width : width , 
    height : 180 , 
    top : height*0.15,
    alignItems:'center'
  },
  ticketImgContainer:{
    width : width , 
    height : 240 , 
    top : 60,
    alignItems:'center'
  },
  bgView :{
    position : 'absolute',
    width : width ,
    height : height ,
    backgroundColor : 'rgba(1,1,1,0.4)'
  },
  backgroundImg :{
      position : 'absolute',
      width : width ,
      height : height
  },welcomeText : {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: "transparent",
    color: 'gray',
    fontWeight: 'bold',
    marginTop: 20
  },
  profileContainer:{
    width : width*0.40 ,
    height :width*0.40 ,
    marginTop : 20
  },hintText : {
    width : null,
    fontSize: width*0.06,
    textAlign: 'center',
    marginTop: 20,
    backgroundColor: "transparent",
    color: 'white',
  },
  btnContainer : {
      marginTop : 40 ,
      width : width*0.60,
      height:50,
      justifyContent: 'center',
      alignItems:'center' ,
      borderRadius: 25,
      backgroundColor:'black',
  }
});

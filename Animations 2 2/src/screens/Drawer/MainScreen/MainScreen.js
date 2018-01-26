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
//merchant.com.wildnet.react

const {width , height} = Dimensions.get('window');
global.PaymentRequest = require('react-native-payments').PaymentRequest;

export default class MainScreen extends Component {
    constructor(props){
        super(props);
        this.stepIn = this.stepIn.bind(this);
        this.state = {openDrawer:props.openDrawer};
    }

    stepIn(){
      alert('DrawerScreen');
  }

  pay(){
    //alert('Hiiii');
    const METHOD_DATA = [{
      supportedMethods: ['apple-pay'],
      data: {
        merchantIdentifier: 'merchant.com.wildnet.react',
        supportedNetworks: ['visa', 'mastercard', 'amex'],
        countryCode: 'US',
        currencyCode: 'USD'
      }
    }];

    const DETAILS = {
      id: 'basic-example',
      displayItems: [
        {
          label: 'Rally Bus Ticket',
          amount: { currency: 'USD', value: '15.00' }
        }
      ],
      total: {
        label: 'rally',
        amount: { currency: 'USD', value: '15.00' }
      }
    };

    const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS);
    paymentRequest.show();
       
  }  
  render() {
    return (
      <View style={styles.container}>
      <TouchableOpacity style = {styles.btnContainer} onPress = {this.props.openDrawer()}>
      <Text style={[styles.hintText, {color:'gray' ,fontWeight:'bold', marginTop:0}]}>Drawer</Text>
      </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor:'red'
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
    fontSize: width*0.06,
    textAlign: 'center',
    backgroundColor: "transparent",
    color: 'white',
    fontWeight: 'bold',
    marginTop: height * 0.25,
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
      backgroundColor:'white',
  }
});

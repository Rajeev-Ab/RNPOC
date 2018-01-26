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
//global.PaymentRequest = require('react-native-payments').PaymentRequest;
import CustomNav from '../../component/customNav/customNav'
export default class PaymentScreen extends Component {
    constructor(props){
        super(props);
        this.stepIn = this.stepIn.bind(this);
        this.state = {openDrawer:props.openDrawer};
    }

    stepIn(){
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
/*
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

  }  */

  renderMainScreen(){
    if (Platform.OS == 'ios'){
      return(
     <View>
        <View style={styles.busImgContainer}>
           <Image style = {{width:100,height:60}} source = {require('../../images/bus.png')} resizeMode={Image.resizeMode.contain}/>
           <Text style = {styles.welcomeText}>Here is your Ticket</Text>
        </View>

        <View style={styles.ticketImgContainer}>
           <Image style = {{width:width*0.60,height:100}} source = {require('../../images/ticket.png')} resizeMode={Image.resizeMode.contain}/>
           <Text style = {styles.welcomeText}>Total cost - $15</Text>
        </View>


      <TouchableOpacity style = {styles.btnContainer} onPress = {()=> this.stepIn()}>
      <Text style={[styles.hintText, {color:'gray' ,fontWeight:'bold', marginTop:0}]}>Apple Pay</Text>
      </TouchableOpacity>
      </View>
      )

    }else{
      return(
<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={[styles.hintText, {color:'gray' ,fontWeight:'bold', marginTop:0}]}>Not Implemented</Text>
         </View>
      )
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <CustomNav  openDrawer = {()=>this.props.openDrawer}/>
       {this.renderMainScreen()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
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
      left  :width*0.20,
      height:50,
      justifyContent: 'center',
      alignItems:'center' ,
      borderRadius: 25,
      backgroundColor:'black',
  }
});

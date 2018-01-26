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

const {width , height} = Dimensions.get('window');
const FBSDK = require('react-native-fbsdk');
const {
  GraphRequest,
  GraphRequestManager,
} = FBSDK;
import { LoginManager } from 'react-native-fbsdk';
import setStateItem from '../../state/setState/SetStateItem'
import getStateItem from '../../state/GetStateItem'
import FbUserDetail from '../../state/Emitters/user/FbUserDetail'
export default class LandingScreen extends Component {
    constructor(props){
        super(props);
        this.stepIn = this.stepIn.bind(this);
         this.getFbDetail = this.getFbDetail.bind(this);
         this.loginFb = this.loginFb.bind(this);
         this._responseInfoCallback = this._responseInfoCallback.bind(this);

    }
    stepIn(){
      setStateItem('userDetail',{});
        this.props.navigation.navigate('DrawerScreen');
    }

_responseInfoCallback(error: ?Object, result: ?Object) {
  console.log('Callback')
  if (error) {
      //
    alert('Error fetching data: ' + error.toString());
  } else {
      //
     setStateItem('userDetail',result);
     //alert('navigating');
       this.props.navigation.navigate('DrawerScreen');

     //FbUserDetail.emit('FBUSER_DETAIL_CHANGE');

     }
}
    getFbDetail(){
      //Create response callback.

  //
// Create a graph request asking for user information with a callback to handle the response.

// Start the graph request.
new GraphRequestManager().addRequest(infoRequest).start();
    }

    loginFb(){
      //
      console.log('test');
       setStateItem('userDetail',{});
       //this.getFbDetail();
       LoginManager.logOut();
       LoginManager.logInWithReadPermissions(['email']).then((result) => {
         //
         console.log('result', result);
    if (result.isCancelled) {
        console.log('Login Cancelled');
    } else {
        //
        const infoRequest = new GraphRequest(
          '/me?fields=id,name,picture.width(480)',
          null,
          this._responseInfoCallback
        );

        new GraphRequestManager().addRequest(infoRequest).start();
      // alert('Login Success permission granted:' + result.grantedPermissions);
      console.log('Login Success permission granted:');
      //this.props.navigation.navigate('DrawerScreen');
      //alert('Login Success permission granted:');
    }
  }, (error) => {
    //
       console.log('some error occurred!!');
  }).catch(function(error) {
  console.log('There has been a problem with your fetch operation: ' + error.message);
 // ADD THIS THROW error
  throw error;
});



//       LoginManager.logInWithReadPermissions(['public_profile']).then((result)=> {
//
//         if (result.isCancelled){
// alert('can not sign in ');
//         }else{
//           console.log(result);
//  this.props.navigation.navigate('DrawerScreen');
//         }, function(error) {
//      console.log("some error occurred!!");
//    })
}

  render() {
    return (
      <View style={styles.container}>

        <Image style =  {styles.backgroundImg} source = {require('../../images/background.jpg')} resizedMode = {Image.resizeMode.contain}/>
        <View style={styles.bgView} />
        <Text style={styles.welcomeText}>Welcome Stranger!</Text>
         <View style={styles.profileContainer} >
         <Image style = {[styles.profileContainer , {marginTop:0}]} source = {require('../../images/profile.png')} resizeMode = "stretch" />
         </View>
         <Text style={styles.hintText}>Please Step in to continue</Text>
         <Text style={[styles.hintText,{marginTop : 0}]}>to the Rally React</Text>

          <TouchableOpacity style = {styles.btnContainer} onPress = {()=> this.loginFb()}>
         <Text style={[styles.hintText, {color:'gray' ,fontWeight:'bold', marginTop:0}]}>Step In facebook</Text>
         </TouchableOpacity>

         <TouchableOpacity style = {styles.btnContainer} onPress = {()=> this.stepIn()}>
         <Text style={[styles.hintText, {color:'gray' ,fontWeight:'bold', marginTop:0}]}>Step In</Text>
         </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
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

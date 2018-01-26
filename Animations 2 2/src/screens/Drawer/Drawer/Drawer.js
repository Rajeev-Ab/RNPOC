
import React, { Component } from 'react';

import {
  Alert
} from 'react-native';





import Drawer from 'react-native-drawer'
import Menu from '../Menu/Menu'
import MainScreen from '../MainScreen/MainScreen'
import SimpleAnimations from '../../simpleAnimations'
import PaymentScreen from '../../Payment/Payment.js'
import MapScreen from '../../Map/Map'
import SpeechRecognition from '../../SpeechRecognition/speechRecognition'
import Sensor from '../../Sensor/Sensor'
import SocialShare from '../../Share/SocialShare'
import NFCManager from '../../NFC/NFCManager'
import setStateItem from '../../../state/setState/SetStateItem'
import AwesomeAlert from 'react-native-awesome-alerts';
import BeaconManager from '../../iBeacon/BeaconManager'
import GeoFencingScreen from '../../geoFencing/geoFencing'
import SendbirdScreen from '../../sendbird/sendbird'
import P2PScreen from '../../p2p/p2pScreen'
import ARScreen from '../../ARScreen/ARScreen'

const FBSDK = require('react-native-fbsdk');
const {
  LoginManager
} = FBSDK;

const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
    main: {paddingLeft: 3},
  }

class DrawerScreen extends Component {
 constructor(props){
     super(props);
     this.openDrawer = this.openDrawer.bind(this);
     this.menuTapped =  this.menuTapped.bind(this);
     this.renderMainScreen = this.renderMainScreen.bind(this);
     this._handleLogout = this._handleLogout.bind(this);
     this.state = {clickedIndex:1};

     
 }

 menuTapped(index){
   this._drawer.close();
   if (this.state.clickedIndex !== index) {
      if (index === 7){
         Alert.alert(
                   'Logout',
                   'Are you sure you want to Logout?',
                   [
                    {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                     {text: 'Yes', onPress: () => this.props.navigation.goBack()},
                   ],
                   { cancelable: false }
)
      }else{
        this.setState({clickedIndex:index});
      }
     
   }

 }
 _handleLogout(){
   LoginManager.logout();
   //do something
   setStateItem('userDetail',{});
   this.props.navigation.goBack()


 }
 renderMainScreen(){



    if (this.state.clickedIndex === 1) {
      // render SimpleAnimationScreen
      return (<SimpleAnimations openDrawer = {this.openDrawer} navigation = {this.props.navigation}/>)
    }else if (this.state.clickedIndex === 2) {
      // render Payment Screen
      return (<PaymentScreen openDrawer = {this.openDrawer}/>)
    }else if (this.state.clickedIndex === 3) {
      // render Payment Screen
      return (<MapScreen openDrawer = {this.openDrawer}/>)
    }else if (this.state.clickedIndex === 4) {
     return (<SpeechRecognition openDrawer = {this.openDrawer}/>)
    }else if (this.state.clickedIndex === 5) {
      return (<Sensor openDrawer = {this.openDrawer}/>)
     }else if (this.state.clickedIndex === 6) {
      return (<SocialShare openDrawer = {this.openDrawer}/>)
     }else if (this.state.clickedIndex === 8) {
      return (<NFCManager openDrawer = {this.openDrawer}/>)
     }else if (this.state.clickedIndex === 9) {
      return (<BeaconManager openDrawer = {this.openDrawer}/>)
     }else if (this.state.clickedIndex === 10) {
      return (<GeoFencingScreen openDrawer = {this.openDrawer}/>)
     }if (this.state.clickedIndex === 11) {
      // render SimpleAnimationScreen
      return (
       <SendbirdScreen openDrawer = {this.openDrawer} navigation = {this.props.navigation}/>
       )
    }else if (this.state.clickedIndex === 12) {
      return (<P2PScreen openDrawer = {this.openDrawer}/>)
     }else if (this.state.clickedIndex === 13) {
      return (<ARScreen openDrawer = {this.openDrawer}/>)
     }

   


 }
 openDrawer(){
     //alert('open');
    this._drawer.open()
 }

  render () {
    return (
        <Drawer
        type="overlay"
        ref={(ref) => this._drawer = ref}
        content={<Menu menuTapped={this.menuTapped} />}
        tapToClose={true}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
        >
        {this.renderMainScreen()}
      </Drawer>
    )
  }
}

module.exports = DrawerScreen;

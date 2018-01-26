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
import CustomNav from '../../component/customNav/customNav'
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'

var base64 = require('base-64');
var utf8 = require('utf8');

import p2pkit from 'react-native-p2pkit'
import P2PKit from 'react-native-p2pkit';

export default class P2PScreen extends Component {
    
    constructor(props){
        super(props);
        this.startPeer =  this.startPeer.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.state = {openDrawer:props.openDrawer, isStarted:false,message:'p2pkit is disabled'};
    }

    startPeer(){
        if (this.state.isStarted){
            this.setState({isStarted:false});
            p2pkit.disable()
        }else{
            p2pkit.enable('7c944a7962d24f69b6639f907ce15eeb', this.p2pkitCallback)
        }
        
    }

    componentWillUnmount(){
        p2pkit.disable()
    }


     p2pkitCallback = {

        onException:(exceptionMessage) => {
            
            console.log(exceptionMessage.message)
        },
    
        onEnabled: () => {
            this.setState({message:'p2pkit is enabled',isStarted:true , isDiscovered:false});
            console.log('p2pkit is enabled')
            p2pkit.enableProximityRanging()
           // Encode the String
            const encodedString = base64.encode('Rajeev')
            //btoa(unescape(encodeURIComponent('str')))
            p2pkit.startDiscovery(encodedString, p2pkit.HIGH_PERFORMANCE) //base64 encoded Data (bytes)
        },
    
        onDisabled: () =>{
            this.setState({message:'p2pkit is disabled',isDiscovered:false});
            console.log('p2pkit is disabled')
        },
    
        // Refer to platform specific API for error codes
        onError: (errorObject) => {
            this.setState({message:'p2pkit failed to enable on platform'});
            console.log('p2pkit failed to enable on platform ' + errorObject.platform + ' with error code ' + errorObject.errorCode)
        },
    
        onDiscoveryStateChanged: (discoveryStateObject) => {
            console.log('discovery state updated on platform ' + discoveryStateObject.platform + ' with error code ' + discoveryStateObject.state)
        },
    
        onPeerDiscovered: (peer)  =>{
            const discoveryInfo = base64.decode(peer.discoveryInfo)
            this.setState({message:'New peer discovered ' + discoveryInfo,isDiscovered:true});
           //const discoveryInfo = base64.decode(peer.discoveryInfo)
           const discoveryInfo1 = 'Hello'
           console.log('discoveryInfo' + discoveryInfo + 'discoveryInfo1'+discoveryInfo1)
            console.log('peer discovered ' + peer.peerID + 'Peer Info'+'info' +peer.discoveryInfo)
        },
    
        onPeerLost: (peer)  =>{
            this.setState({message:'peer lost ' + peer.peerID});
            console.log('peer lost ' + peer.peerID)
        },
    
        onPeerUpdatedDiscoveryInfo: (peer) => {
            const discoveryInfo = base64.decode(peer.discoveryInfo)
            this.setState({message:'Message recieved : ' +discoveryInfo});
            
            console.log('discovery info updated for peer ' + peer.peerID + ' info ' + peer.discoveryInfo)
        },
    
        onProximityStrengthChanged: (peer) => {
            const discoveryInfo = base64.decode(peer.discoveryInfo)
            this.setState({message:'proximity strength for peer '+ discoveryInfo + peer.proximityStrength });
            ///const discoveryInfo = base64.decode(peer.discoveryInfo)
           const discoveryInfo1 = 'Hello'
           console.log('discoveryInfo' + discoveryInfo + 'discoveryInfo1'+discoveryInfo1)
           
            console.log('proximity strength changed for peer ' + peer.peerID + ' proximity strength ' + peer.proximityStrength)
        },
    
        onGetMyPeerId: (reply)  => {
            console.log(reply.myPeerId)
        },
        
        onGetDiscoveryPowerMode: (reply)  => {
            console.log(reply.discoveryPowerMode)
        }
    }
    sendMessage(){
        alert('sending message');
        const encodedString = base64.encode('Hello I m here');
        p2pkit.pushNewDiscoveryInfo(encodedString);
    }
  renderMessage(){
      if (this.state.message === ''){
        return(<View />)
      }else{
        return(
            <View style={styles.topShadow}>
            <Text multiline= {true} style = {styles.labelText}>{this.state.message}</Text>
            </View>
          ) 
      }
      
  }
 renderTitle(){
     if (this.state.isStarted){
         return(
             <View style = {{width:width,height:40,marginTop:150}}>
<Button
                        buttonStyle={{backgroundColor: '#2096f3'}}
                        title='Stop Peer' 
                        onPress={this.startPeer}
                    />
                    </View>
         )
     }else{
         return(
            <View style = {{width:width,height:40,marginTop:150}}>
<Button
                        buttonStyle={{backgroundColor: '#2096f3'}}
                        title='Start Peer' 
                        onPress={this.startPeer}
                    />
                    </View>
         )
     }
 } 
 
 renderSendMessage(){
     if (this.state.isDiscovered){
         return(
            <View style = {{width:width,height:200,marginTop:50,justifyContent: 'center',alignItems:'center'}}>
            <Text>Hello I am here</Text>
            <Button
                                    buttonStyle={{backgroundColor: '#2096f3'}}
                                    title='Send Message' 
                                    onPress={this.sendMessage}
                                />
                                </View>
         )
     }else{
         return(
             <View/>
         )
     }
 }
  render() {
    return (
      <View style={styles.container}>
        <CustomNav  openDrawer = {()=>this.props.openDrawer}/>
        
        {this.renderTitle()}
        {this.renderMessage()}
        {this.renderSendMessage()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  }, topShadow:{
    position:'absolute',
     left :width*0.05,
     marginTop:90,
     width:width*0.90,
     borderRadius:5,
     borderColor:'green',
     borderWidth:1,
     backgroundColor:'rgba(1,1,1,0.5)',
     justifyContent:'center',
     alignItems:'center',
     height:60
  },
  labelText:{
    color :'white',
    textAlign:'center',
    fontSize:13
  },
});

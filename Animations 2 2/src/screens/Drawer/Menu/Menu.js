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
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import getStateItem from '../../../state/GetStateItem'
import FbUserDetail from '../../../state/Emitters/user/FbUserDetail'
const {width , height} = Dimensions.get('window');

export default class Menu extends Component {
  constructor(props){
    super(props);
    this.renderBgImage =  this.renderBgImage.bind(this);
    this._fbUserChange = this._fbUserChange.bind(this);
    this.state = {menuTapped:props.menuTapped};
    

  }

  componentWillMount(){
    console.log('componentWillMount');
  }


  componentDidMount(){
    console.log('componentDidMount');
    FbUserDetail.addFbUserDetailListener(this._fbUserChange);
  }
_fbUserChange(){
  let detail = getStateItem('userDetail');
    
}
  componentWillUnmount(){
    console.log('componentWillUnmount');
    FbUserDetail.removeFbUserDetailListener(this._fbUserChange);
  }

  

  renderBgImage(){
    
    let detail = getStateItem('userDetail');
   // alert(detail);
     console.log("in else block"+detail.length);
    if (detail === null || detail === 'undefined' || detail.length > 0){
      return (
        <Image style =  {styles.backgroundImg} source = {require('../../../images/background.jpg')} resizedMode = {Image.resizeMode.contain}/>
      )
    }else {
      console.log("in else block");
      if (detail.picture) {
        return (
        <View style = {styles.backgroundImg}>

        <Image style =  {styles.backgroundImg} source = {{uri:detail.picture.data.url}} resizedMode = {Image.resizeMode.contain}/>
         <View style = {styles.nameContainer}>
        <Text style = {styles.nameLabel}>{detail.name}</Text>
        </View>
        </View>
        )
      }else{
        return (
        <Image style =  {styles.backgroundImg} source = {require('../../../images/background.jpg')} resizedMode = {Image.resizeMode.contain}/>
      )
        
    }
      }
  }
  render() {
    return (
      <View style={styles.container}>
       {this.renderBgImage()}
       <View style={styles.bgView} />
       <ScrollView>
        <TouchableOpacity style={styles.row} onPress = {()=>this.props.menuTapped(1)}>
       <Text style = {styles.welcomeText}>Animation</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress = {()=>this.props.menuTapped(2)}>
       <Text style = {styles.welcomeText}>Payment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress = {()=>this.props.menuTapped(3)}>
       <Text style = {styles.welcomeText}>Map</Text>
        </TouchableOpacity>


      <TouchableOpacity style={styles.row} onPress = {()=>this.props.menuTapped(4)}>
       <Text style = {styles.welcomeText}>Speech</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress = {()=>this.props.menuTapped(5)}>
       <Text style = {styles.welcomeText}>Sensor</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress = {()=>this.props.menuTapped(6)}>
       <Text style = {styles.welcomeText}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress = {()=>this.props.menuTapped(8)}>
       <Text style = {styles.welcomeText}>NFC</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.row} onPress = {()=>this.props.menuTapped(9)}>
       <Text style = {styles.welcomeText}>iBeacon</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress = {()=>this.props.menuTapped(10)}>
       <Text style = {styles.welcomeText}>Geofencing</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress = {()=>this.props.menuTapped(11)}>
       <Text style = {styles.welcomeText}>Sendbird</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress = {()=>this.props.menuTapped(12)}>
       <Text style = {styles.welcomeText}>P2P</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress = {()=>this.props.menuTapped(13)}>
       <Text style = {styles.welcomeText}>ARKit</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.row} onPress = {()=>this.props.menuTapped(7)}>
       <Text style = {styles.welcomeText}>Logout</Text>
        </TouchableOpacity>
      
      </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'green'
  },
  bgView :{
    position : 'absolute',
    width : width*0.80 ,
    height : height*0.25,
    backgroundColor : 'rgba(1,1,1,0.4)'
  },
  backgroundImg :{
      width : width*0.80,
      height : height*0.25
  },welcomeText : {
    fontSize: width*0.06,
    textAlign: 'center',
    backgroundColor: "transparent",
    color: 'white',
    fontWeight: 'bold'
  },
  row : {
  marginTop:1,
  width : width*0.80,
  height:50,
  backgroundColor:'#003a5d',
  justifyContent:'center',
  alignItems:'center'
  },
  nameContainer:{
    position: 'absolute' ,
    width : width*0.80 ,
    height : 30 ,
    top : height*0.25 - 30 ,
    backgroundColor: 'rgba(1,1,1,0.6)',
    justifyContent:'center' ,
    alignItems:'center'
  },
  nameLabel:{
   fontSize: 18 , 
   fontWeight: 'bold' ,
   color: 'white'
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

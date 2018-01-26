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
    MapManager
} = require('NativeModules');

const {width , height} = Dimensions.get('window');
const SPACE = 0.01;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.009222;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

import MapView from 'react-native-maps';


import CustomNav from '../../component/customNav/customNav'

export default class MapScreen extends Component {
    constructor(props){
        super(props);
        this.showMap = this.showMap.bind(this);
        this.state = {region:null,isGPSFound:false};
        
    }

    showMap(){
        //MapManager.intializeMap();
        alert('hi');
       // MapManager.setPositionWith(position.coords.latitude,position.coords.longitude);
    }

   watchID = null ;

    componentDidMount(){
     // getting current position
     navigator.geolocation.getCurrentPosition((position)=>{
       var lat = parseFloat(position.coords.latitude);
       var long = parseFloat(position.coords.longitude);

       var intialRegion = {
         latitude:lat,
         longitude:long,
         latitudeDelta:LATITUDE_DELTA,
         longitudeDelta:LONGITUDE_DELTA
       }

       this.setState({region:intialRegion,isGPSFound:true});


     },(error)=>alert(JSON.stringify(error)),
     {enableHighAccuracy:true,timeout:20000,maximumAge:1000 })

     this.watchID = navigator.geolocation.watchPosition((position)=>{
      var lat = parseFloat(position.coords.latitude);
      var long = parseFloat(position.coords.longitude);

      var lastRegion = {
        latitude:lat,
        longitude:long,
        latitudeDelta:LATITUDE_DELTA,
        longitudeDelta:LONGITUDE_DELTA
      }

      
      this.setState({region:lastRegion,isGPSFound:true});
     })


     



       /* this.watchID = navigator.geolocation.watchPosition((position) => {
      // Create the object to update this.state.mapRegion through the onRegionChange function
      let region = {
        latitude:       position.coords.latitude,
        longitude:      position.coords.longitude,
        latitudeDelta:  0.00922*1.5,
        longitudeDelta: 0.00421*1.5
      }
      this.setState({region:region});

      console.log(" "+position.coords.latitude+"long"+position.coords.longitude)
      //this.onRegionChange(region, region.latitude, region.longitude);
     // MapManager.setPositionWith(position.coords.latitude,position.coords.longitude);
    });*/
    }
componentWillUnmount(){
  navigator.geolocation.clearWatch(this.watchID);
}
    renderMap() {
      if (this.state.isGPSFound === false) {
        return (<View />)
      }else{
       let lattitude = this.state.region.latitude ;
       let longitude = this.state.region.longitude ;
        return ( <MapView
         style= 
         {{flex: 1}}
    region={this.state.region}
  >

    <MapView.Marker
      coordinate={{
              latitude: lattitude ,
              longitude:  longitude,
            }}
      title={'I am here'}
      description={'My Location'}
    />

</MapView>



  )
       
      }
    }

    
  render() {
    return (
      <View style={styles.container}>
        <CustomNav  openDrawer = {()=>this.props.openDrawer}/>
        {this.renderMap() } 
        
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

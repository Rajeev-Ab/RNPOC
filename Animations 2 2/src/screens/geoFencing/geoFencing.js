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
  NativeAppEventEmitter,
  Dimensions,
  NativeModules,
  TouchableOpacity,
  View
} from 'react-native';

var {
    MapManager
} = require('NativeModules');

const SPACE = 0.01;
import { Dropdown } from 'react-native-material-dropdown';

import MapView from 'react-native-maps';

//merchant.com.wildnet.react
const {width , height} = Dimensions.get('window');
import CustomNav from '../../component/customNav/customNav'
import RNGeofence from 'react-native-geo-fence';

import getStateItem from '../../state/GetStateItem'
import setStateItem from '../../state/setState/SetStateItem'
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.009222;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO



import _ from 'lodash';

let id = 1;
let circleId = 0;
let geofenceId = 0 ;

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}



export default class GeoFencingScreen extends Component {
    constructor(props){
        super(props);
        this.showMap = this.showMap.bind(this);
        this.onChangeText = this.onChangeText.bind(this)
        this.clearCircleMarker = this.clearCircleMarker.bind(this);
        const  geofenceArray= getStateItem('geofenceArray')
        this.state = {region:null,markers: [], circle:geofenceArray,geofences:[],isLocationFound:false,isMoniteringGeofence:false,radius:200};

    }

    onChangeText(text) {
      const intRadius = parseInt(text);
      this.setState({radius:intRadius});
    }

 arePointsNear(checkPoint, centerPoint, km) {
  var ky = 40000 / 360;
  var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
  var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
  var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= km;
}


    onMapPress(e) {
      if (this.state.circle.length === 3) {
        alert('Sorry, You can not add more than 3 geofence, Please clear these geofence.');
        return;
      }
       this.setState({
          markers: [
            ...this.state.markers,
            {
              coordinate: e.nativeEvent.coordinate,
              key: id++,
              color: randomColor(),
            },
          ],
        });


        this.setState({
            circle: [
              ...this.state.circle,
              {
                center: e.nativeEvent.coordinate,
                key: circleId++,
                radius:this.state.radius,
                strokeWidth:1,
                strokeColor:randomColor(),
                fillColor:'rgba(1,1,1,0.6)'
              },
            ],
          });

setStateItem(this.state)

//let arrayPoint = this.findCoordinates(e.nativeEvent.coordinate.latitude,e.nativeEvent.coordinate.longitude,200);

let point = {
    lat: e.nativeEvent.coordinate.latitude,
    lng: e.nativeEvent.coordinate.longitude
  };


  let checkPoint = {
      lat: this.state.region.latitude,
      lng:this.state.region.longitude
    };
let radiusCheck = this.state.radius / 1000 ;
    let value = this.arePointsNear(checkPoint, point , radiusCheck)

    if (value){
      alert("You are within the region !!!");
    }else {
      if (Platform.OS === 'ios'){
        var geoManager = NativeModules.GeoManager;
        const geofenceRadiusInMetres = this.state.radius; // geofence radius
      //const geofenceExpirationInMilliseconds = 86400000; // geofence expiration time
  
      // add geofences array to module
      geoManager.populateGeofenceList(
        this.state.geofences,
        geofenceRadiusInMetres
      );
  
      // start tracking geofences
      geoManager.beginGeofencing();
      this.setState({isMoniteringGeofence:true});
      }else{
        this.setState({
          geofences: [
            ...this.state.geofences,
            {
              
              key: geofenceId++,
              latitude:e.nativeEvent.coordinate.latitude,
              longitude:e.nativeEvent.coordinate.longitude
            },
          ],
        });
  
        // geofence is added
        // create radius and expiry time
      const geofenceRadiusInMetres = this.state.radius; // geofence radius
      const geofenceExpirationInMilliseconds = 86400000; // geofence expiration time
  
      // add geofences array to module
      RNGeofence.populateGeofenceList(
        this.state.geofences,
        geofenceRadiusInMetres,
        geofenceExpirationInMilliseconds,
      );
  
      // start tracking geofences
      RNGeofence.beginGeofencing();

      this.setState({isMoniteringGeofence:true});
      }
      alert("You are outside the region !!!");
      // Add for the geofence
      

    }



}
handleNativeEvents = (event) => {
  /*
  * event contains an object as below
  *
  * {
  *   event: 'geofenceTrigger',
  *   data: [{
  *     transition: 'Entered', // transition is either "Entered" or "Exited" explains if user entered or exited geofence
  *     key: 'qyuwhbhh783',
  *     latitude: 6.4334191,
  *     longitude: 3.4345843,
  *   }]
  * }
  *
  * data contains an array of geofences triggered.
  * It is always an array, even if only one geofence was triggered
  *
  * */

  console.log('Native Event: ', event);

  // do something else with event object and geofences
  let status = event.data[0].transition ;
  alert('You' + status + 'the region');
};


    showMap(){
        //MapManager.intializeMap();
        alert('hi');
       // MapManager.setPositionWith(position.coords.latitude,position.coords.longitude);
    }

    componentWillUnmount() {
      // stop geofencing
      if (this.state.isMoniteringGeofence){
        RNGeofence.stopGeofencing();
        
      }
      navigator.geolocation.clearWatch(this.watchID);
      // remove listener
      _.each(this.listeners, l => l.remove());
    }

    watchID = null ;

    

    componentDidMount(){
    
      this.listeners = [
        NativeAppEventEmitter.addListener('GeofenceEvent', this.handleNativeEvents),
      ];

      navigator.geolocation.getCurrentPosition((position)=>{
        var lat = parseFloat(position.coords.latitude);
        var long = parseFloat(position.coords.longitude);
 
        var intialRegion = {
          latitude:lat,
          longitude:long,
          latitudeDelta:LATITUDE_DELTA,
          longitudeDelta:LONGITUDE_DELTA
        }
 
        this.setState({region:intialRegion,isLocationFound:true});


        this.setState({
          markers: [
            ...this.state.markers,
            {
              coordinate: {'latitude':this.state.region.latitude, 'longitude':this.state.region.longitude},
              key: id++,
              color: randomColor(),
            },
          ],
        });
 
 
      },(error)=>alert(JSON.stringify(error)),
      {enableHighAccuracy:true,timeout:20000,maximumAge:1000 })

        this.watchID = navigator.geolocation.watchPosition((position) => {
      // Create the object to update this.state.mapRegion through the onRegionChange function
      var lat = parseFloat(position.coords.latitude);
        var long = parseFloat(position.coords.longitude);
      var lastRegion = {
        latitude:lat,
        longitude:long,
        latitudeDelta:LATITUDE_DELTA,
        longitudeDelta:LONGITUDE_DELTA
      }

      this.setState({region:lastRegion,isLocationFound:true});


      this.setState({
        markers: [
          ...this.state.markers,
          {
            coordinate: {'latitude':this.state.region.latitude, 'longitude':this.state.region.longitude},
            key: id++,
            color: randomColor(),
          },
        ],
      });

      console.log(" "+position.coords.latitude+"long"+position.coords.longitude)
      //this.onRegionChange(region, region.latitude, region.longitude);
     // MapManager.setPositionWith(position.coords.latitude,position.coords.longitude);
    });
    }

    renderMap() {
      if (this.state.isLocationFound === false) {
        return (<View />)
      }else{
       let lattitude = this.state.region.latitude ;
       let longitude = this.state.region.longitude ;
        return ( <MapView
         style=
         {{flex: 1}}
    initialRegion={this.state.region}
    onPress={(e) => this.onMapPress(e)}
  >

{this.state.markers.map(marker => (
            <MapView.Marker
              key={marker.key}
              coordinate={marker.coordinate}
              pinColor={marker.color}
            />
          ))}

{this.state.circle.map(circle => (
            <MapView.Circle
              key={circle.key}
              center={circle.center}
              radius = {circle.radius}
              strokeWidth={circle.strokeWidth}
              strokeColor={circle.strokeColor}
              fillColor={circle.fillColor}

            />
          ))}


</MapView>



  )

      }
    }
    clearCircleMarker(){

      if (this.state.isMoniteringGeofence){
        if (Platform.OS == ios){
          var geoManager = NativeModules.GeoManager;
          geoManager.stopGeofencing();
        }else{
          RNGeofence.stopGeofencing();
        }
        this.setState({isMoniteringGeofence:false});
      }

        this.setState({circle:[] , markers:[] , geofences:[]});

          this.setState({
            markers: [
              {
                coordinate: {'latitude':this.state.region.latitude, 'longitude':this.state.region.longitude},
                key: id++,
                color: randomColor(),
              },
            ],
          });

    }
  renderClearCircleButton(){
      if (this.state.circle.length > 0){
          console.log("Rendring renderClearCircleButton");
          return(
            <TouchableOpacity style={[styles.topShadow,{marginTop:height - 60, left:width*0.30,width:width*0.40,height:30}]} onPress={()=> this.clearCircleMarker()}>
        <Text multiline= {true} style = {styles.labelText}>Clear Region</Text>
        </TouchableOpacity>
          )
      }else{
        console.log("Not Rendring renderClearCircleButton");
          return(<View/>)
      }
  }




  render() {
    let data = [
      {
        value: '50',
      },{
      value: '100',
    }, {
      value: '200',
    }, {
      value: '300',
    },{
      value: '400',
    },{
      value: '500',
    },];

    return (
      <View style={styles.container}>

        <CustomNav  openDrawer = {()=>this.props.openDrawer}/>
        {this.renderMap() }
         <View style={{width:width*0.30,height:40,marginLeft:width*0.65,top:140,position:'absolute'}}>
          <Dropdown
        label='Geofance Radius'
        labelFontSize={10}
        onChangeText={this.onChangeText}
        baseColor={'rgba(1,1,1,0.6)'}
        data={data}
      />
         </View>
        
       
        <View style={styles.topShadow}>
        <Text multiline= {true} style = {styles.labelText}>Press anywhere on Map to draw a region of geofence</Text>
        </View>



        {this.renderClearCircleButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  topShadow:{
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

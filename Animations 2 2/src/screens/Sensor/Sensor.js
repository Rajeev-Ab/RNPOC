
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
  DeviceEventEmitter,
  View
} from 'react-native';
//merchant.com.wildnet.react
/*var {
    Accelerometer,
    Gyroscope,
    Magnetometer
} = require('NativeModules');
var {
  DeviceEventEmitter // will emit events that you can listen to
} = React;*/
var {
    Accelerometer,Gyroscope,Magnetometer
} = require('NativeModules');
Accelerometer.setAccelerometerUpdateInterval(0.1);
Gyroscope.setGyroUpdateInterval(0.1);
Magnetometer.setMagnetometerUpdateInterval(0.1);

var mSensorManager = require('NativeModules').SensorManager;

const {width , height} = Dimensions.get('window');



import CustomNav from '../../component/customNav/customNav'

//import { decorator as sensors } from 'react-native-sensors';

export default class Sensor extends Component {
    constructor(props){
        super(props);
        //this.state = {accelerometerX:null , accelerometerY:null , accelerometerZ:null , gyroscopeX:null ,gyroscopeY:null , gyroscopeZ:null , MagnetometerX:null , MagnetometeY:null , MagnetometerZ:null};
         this.handleStop = this.handleStop.bind(this);
         this.handleStart = this.handleStart.bind(this);
        this.state = {x:0 , y:0 , z:0 ,Gx:0 , Gy:0 , Gz:0,Mx:0 , My:0 , Mz:0, gyroscope:false};
    }

componentDidMount(){
  if (Platform.OS === 'ios'){
    DeviceEventEmitter.addListener('AccelerationData', function (data) {
      this.setState({
        x: data.acceleration.x.toFixed(5),
        y: data.acceleration.y.toFixed(5),
        z: data.acceleration.z.toFixed(5)
      });
    }.bind(this));


    DeviceEventEmitter.addListener('GyroData', function (data) {
      this.setState({
        Gx: data.rotationRate.x.toFixed(5),
        Gy: data.rotationRate.y.toFixed(5),
        Gz: data.rotationRate.z.toFixed(5)
      });
    }.bind(this));

     DeviceEventEmitter.addListener('MagnetometerData', function (data) {
      this.setState({
        Mx: data.magneticField.x.toFixed(5),
        My: data.magneticField.y.toFixed(5),
        Mz: data.magneticField.z.toFixed(5)
      });
    }.bind(this));

  }else{
    DeviceEventEmitter.addListener('Gyroscope', function (data) {
      this.setState({
        Gx: data.x,
        Gy: data.y,
        Gz: data.z
      });
    }.bind(this));
  }
   
// accelerometer 
/*
if (Platform.OS == 'ios'){
  Accelerometer.setAccelerometerUpdateInterval(0.1); // in seconds
DeviceEventEmitter.addListener('AccelerationData', function (data) {
  
  this.setState({accelerometerX:data.acceleration.x , accelerometerY:data.acceleration.y , accelerometerZ:data.acceleration.z});
});
Accelerometer.startAccelerometerUpdates(); // you'll start getting AccelerationData events above
Accelerometer.stopAccelerometerUpdates();


Gyroscope.setGyroUpdateInterval(0.1); // in seconds
DeviceEventEmitter.addListener('GyroData', function (data) {
 
  this.setState({gyroscopeX:data.rotationRate.x , gyroscopeY:data.rotationRate.y , gyroscopeZ:data.rotationRate.z});
});
Gyroscope.startGyroUpdates(); // you'll start getting GyroscopicData events above
Gyroscope.stopGyroUpdates();


Magnetometer.setMagnetometerUpdateInterval(0.1); // in seconds
DeviceEventEmitter.addListener('MagnetometerData', function (data) {
  
   this.setState({MagnetometerX:data.magneticField.x , MagnetometerY:data.magneticField.y , MagnetometerZ:data.magneticField.z});
});
Magnetometer.startMagnetometerUpdates(); // you'll start getting MagnetomerData events above
Magnetometer.stopMagnetometerUpdates();
}
*/


}
componentWillUnmount(){
  
  if (Platform.OS === 'ios'){
    Accelerometer.stopAccelerometerUpdates();
    Gyroscope.stopGyroUpdates();
     Magnetometer.stopMagnetometerUpdates();
  }else{
    mSensorManager.stopGyroscope();
  }
}
  handleStart(){
    if (Platform.OS === 'ios'){
    Accelerometer.startAccelerometerUpdates();
     Gyroscope.startGyroUpdates();
     Magnetometer.startMagnetometerUpdates();
    }else{
      mSensorManager.startGyroscope(100);
    }
    this.setState({
      gyro: true
    });
  }
  handleStop() {
    if (Platform.OS === 'ios'){
    Accelerometer.stopAccelerometerUpdates();
     Gyroscope.stopGyroUpdates();
   Magnetometer.stopMagnetometerUpdates();
    }else{
      mSensorManager.stopGyroscope();
    }
    this.setState({
      x:0 , y:0 , z:0 ,Gx:0 , Gy:0 , Gz:0,Mx:0 , My:0 , Mz:0 ,
      gyro: false
    });


  }

    renderButton(){
  if (this.state.gyro){
    return(
      <TouchableOpacity style={{margin: 40}} onPress={this.handleStop}>
          <Text>Stop</Text></TouchableOpacity> 
      )
  }else{
    return(
      <TouchableOpacity style={{margin: 40}} onPress={this.handleStart}><Text>Start</Text></TouchableOpacity>)
  }
}

renderMainScreen(){
  if (Platform.OS === 'ios'){
    return(
<View style={styles.subContainer}>
        <Text>Accelerometer x: {this.state.x}</Text>
        <Text>Accelerometer y: {this.state.y}</Text>
        <Text>Accelerometer z: {this.state.z}</Text>

         
        

        <Text style = {{marginTop:40}}>Gyroscope x: {this.state.Gx}</Text>
        <Text>Gyroscope y: {this.state.Gy}</Text>
        <Text>Gyroscope z: {this.state.Gz}</Text>

         
        



        <Text style = {{marginTop:40}}>Magnetometer x: {this.state.Mx}</Text>
        <Text>Magnetometer y: {this.state.My}</Text>
        <Text>Magnetometer z: {this.state.Mz}</Text>

         
        {this.renderButton()}





        </View>

      
        
        
      

    )
  }else{
    return(
<View style={styles.subContainer}>
        <Text>Accelerometer x: {this.state.x}</Text>
        <Text>Accelerometer y: {this.state.y}</Text>
        <Text>Accelerometer z: {this.state.z}</Text>




        <Text style = {{marginTop:40}}>Gyroscope x: {this.state.Gx}</Text>
        <Text>Gyroscope y: {this.state.Gy}</Text>
        <Text>Gyroscope z: {this.state.Gz}</Text>






        <Text style = {{marginTop:40}}>Magnetometer x: {this.state.Mx}</Text>
        <Text>Magnetometer y: {this.state.My}</Text>
        <Text>Magnetometer z: {this.state.Mz}</Text>


        {this.renderButton()}





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
  },subContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'  
  }
});


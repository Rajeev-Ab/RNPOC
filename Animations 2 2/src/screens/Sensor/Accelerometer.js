import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  DeviceEventEmitter,
  Dimensions,
  TouchableOpacity,
  View
} from 'react-native';

var {
    Accelerometer
} = require('NativeModules');
Accelerometer.setAccelerometerUpdateInterval(0.1);

export default class Accelermoeter extends Component {
 constructor(props){
        super(props);
        this.handleStop = this.handleStop.bind(this);
         this.handleStart = this.handleStart.bind(this);
        this.state = {x:0 , y:0 , z:0 , gyroscope:false};
        
    }
renderBackBtn(){
  if (Platform.OS == 'ios'){
    return(
      <TouchableOpacity style = {styles.backBtn} onPress ={()=> this.props.navigation.goBack()}>
  <Text>BACK</Text>
       </TouchableOpacity>
    )
  }else{
    return(
      <View />
    )
  }
}
 componentDidMount(){
    DeviceEventEmitter.addListener('AccelerationData', function (data) {
      this.setState({
        x: data.acceleration.x.toFixed(5),
        y: data.acceleration.y.toFixed(5),
        z: data.acceleration.z.toFixed(5)
      });
    }.bind(this));
  }

  componentWillUnmount(){
    Accelerometer.stopAccelerometerUpdates();
  }
  handleStart(){
    Accelerometer.startAccelerometerUpdates();
    this.setState({
      gyro: true
    });
  }
  handleStop() {
    Accelerometer.stopAccelerometerUpdates();
    this.setState({
      x: 0,
      y: 0,
      z: 0,
      gyro: false
    });
  }



render(){
	return(
		<View style={styles.container}>
         {this.renderBackBtn()}
          <View style={{
        flex: 1,
       }}>
      
      <View style= {{ justifyContent: 'center',
        alignItems: 'center'}}>
        <Text>x: {this.state.x}</Text>
        <Text>y: {this.state.y}</Text>
        <Text>z: {this.state.z}</Text>
        {
          (this.state.gyro) ?
          <TouchableOpacity style={{margin: 20}} onPress={this.handleStop}>
          <Text>Stop</Text></TouchableOpacity> :
          <TouchableOpacity style={{margin: 20}} onPress={this.handleStart}><Text>Start</Text></TouchableOpacity>
        }
      </View>
         </View>
          </View>
	)
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
  },
  backBtn:{
    marginLeft: 20,
    marginTop: 20 ,
    width : 80 ,
    height : 40
  }
});



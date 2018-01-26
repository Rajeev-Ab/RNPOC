/**
 * AccelerometerManager
 *
 * Created by Patrick Williams in beautiful Seattle, WA.
 */
'use strict';

var React = require('react-native');
var Button = require('react-native-button');
var {
  Text,
  View,
  DeviceEventEmitter
} = React;

var {
    Accelerometer
} = require('NativeModules');


Accelerometer.setAccelerometerUpdateInterval(0.1);

var AccelerometerManager = React.createClass({
  getInitialState: function () {
    return {
      x: 0,
      y: 0,
      z: 0,
      gyro: false
    }
  },
  renderBackBtn: function (){
  return(
      <Button style = {{
    marginLeft: 20,
    marginTop: 20 ,
    width : 80 ,
    height : 40
  }} onPress ={()=> this.props.navigation.goBack()}>
  <Text>BACK</Text>
       </Button>
    )
  
},
  componentDidMount: function () {
    DeviceEventEmitter.addListener('AccelerationData', function (data) {
      this.setState({
        x: data.acceleration.x.toFixed(5),
        y: data.acceleration.y.toFixed(5),
        z: data.acceleration.z.toFixed(5)
      });
    }.bind(this));
  },
  componentWillUnmount: function () {
    Accelerometer.stopAccelerometerUpdates();
  },
  handleStart: function () {
    Accelerometer.startAccelerometerUpdates();
    this.setState({
      gyro: true
    });
  },
  handleStop: function () {
    Accelerometer.stopAccelerometerUpdates();
    this.setState({
      x: 0,
      y: 0,
      z: 0,
      gyro: false
    });
  },
  render: function() {
    console.log(this.state);
    return (
      <View style={{
        flex: 1,
       }}>
      {this.renderBackBtn()}
      <View style= {{ justifyContent: 'center',
        alignItems: 'center'}}>
        <Text>x: {this.state.x}</Text>
        <Text>y: {this.state.y}</Text>
        <Text>z: {this.state.z}</Text>
        {
          (this.state.gyro) ?
          <Button style={{color: 'red', margin: 20}} onPress={this.handleStop}>Stop</Button> :
          <Button style={{color: 'green', margin: 20}} onPress={this.handleStart}>Start</Button>
        }
      </View>
      </View>
    );
  }
});

module.exports = AccelerometerManager;

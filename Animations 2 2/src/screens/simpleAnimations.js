import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Easing,
  Animated,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import FirebaseCrash from 'react-native-firebase-crash-report'
import CustomNav from '../../src/component/customNav/customNav'
var Fabric = require('react-native-fabric');

var { Crashlytics } = Fabric

export default class simpleAnimations extends Component {

  constructor (props) {
    	super(props);
      this.animatedValue = new Animated.Value(0)
      this.crashIt = this.crashIt.bind(this);
      this.state = {openDrawer:props.openDrawer,navigation:props.navigation}
    }
    componentWillMount(){
      this._animatedValue = new Animated.Value(0);
    }

    componentDidMount(){
      Animated.timing(this._animatedValue, {
        toValue: 100,
        duration: 3000
    }).start();
    }

    animate (easing) {
        this.animatedValue.setValue(0)
          Animated.timing(
            this.animatedValue,
            {
              toValue: 1,
              duration: 1000,
              easing
            }
        ).start()
      }


      crashIt(){
       // just a string
    Crashlytics.recordError("IT BROKED!");

    // a domain
    Crashlytics.recordError({
      domain: "somedomain",
      message: "something broke",
    });

    // a code
    Crashlytics.recordError({
      code: "123",
      message: "it broke again",
    });

    // a bunch of stuff
    Crashlytics.recordError({
      code: "123",
      domain: "somedomain",
      message: "help please",
      stack: `someMethod@http://localhost:8081/index.ios.bundle?platform=ios&dev=true:82410:46
  anotherMethod@http://localhost:8081/index.ios.bundle?platform=ios&dev=true:82451:34
wrappedResolvedCallback@http://localhost:8081/index.ios.bundle?platform=ios&dev=true:64615:32
resolve@http://localhost:8081/index.ios.bundle?platform=ios&dev=true:64553:33
wrappedResolvedCallback@http://localhost:8081/index.ios.bundle?platform=ios&dev=true:64630:22
resolve@http://localhost:8081/index.ios.bundle?platform=ios&dev=true:64553:33
wrappedResolvedCallback@http://localhost:8081/index.ios.bundle?platform=ios&dev=true:64630:22
resolve@http://localhost:8081/index.ios.bundle?platform=ios&dev=true:64553:33
http://localhost:8081/index.ios.bundle?platform=ios&dev=true:64625:22
  wrappedResolvedCallback@http://localhost:8081/index.ios.bundle?platform=ios&dev=true:64615:32
http://localhost:8081/index.ios.bundle?platform=ios&dev=true:64681:30
  http://localhost:8081/index.ios.bundle?platform=ios&dev=true:4670:18
    callTimer@http://localhost:8081/index.ios.bundle?platform=ios&dev=true:4292:9
forEach@[native code]
callTimers@http://localhost:8081/index.ios.bundle?platform=ios&dev=true:4315:17
__callFunction@http://localhost:8081/index.ios.bundle?platform=ios&dev=true:3702:28
http://localhost:8081/index.ios.bundle?platform=ios&dev=true:3606:22
  guard@http://localhost:8081/index.ios.bundle?platform=ios&dev=true:3560:3
callFunctionReturnFlushedQueue@http://localhost:8081/index.ios.bundle?platform=ios&dev=true:3605:6
callFunctionReturnFlushedQueue@[native code]
apply@[native code]`,
});
        
Crashlytics.setUserName('megaman');

Crashlytics.setUserEmail('urajeev77@gmail.com');

Crashlytics.setUserIdentifier('1234');

Crashlytics.setBool('has_posted', true);

Crashlytics.setString('organization', 'Acme. Corp');

// Forces a native crash for testing
Crashlytics.crash();

// Due to differences in primitive types between iOS and Android I've exposed a setNumber function vs. setInt, setFloat, setDouble, setLong, etc                                        
//Crashlytics.setNumber('post_count', 5);

// Record a non-fatal JS error only on Android
//Crashlytics.logException('');

// Record a non-fatal JS error only on iOS
Crashlytics.recordError('something went wrong!');
      }
  render() {
    const marginLeft = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 260]
    })

    var interpolatedColorAnimation = this._animatedValue.interpolate({
      inputRange: [0, 100],
    outputRange: ['rgba(0,0,0, 1)', 'rgba(255,255,255, 1)']
  });


    return (
      <Animated.View style={[styles.container, {backgroundColor: interpolatedColorAnimation}]}>
      <CustomNav  openDrawer = {()=>this.props.openDrawer}/>
       <ScrollView>
         <Button easing='Tinder Card Swipe' onPress={()=>this.props.navigation.navigate('MoveWithFinger')}/>
          <Button easing='Preview' onPress={()=>this.props.navigation.navigate('DemoPage')}/>
          <Button easing='Flip' onPress={()=>this.props.navigation.navigate('Flip')}/>
          <Button easing='More Animation' onPress={()=>this.props.navigation.navigate('MoreAnimation')}/>
          <Button easing='Rotate' onPress={()=>this.props.navigation.navigate('Spin')}/>
          <Button easing='Metarial Control' onPress={()=>this.props.navigation.navigate('MetarialScreen')}/>
          <Button easing='Spring' onPress={()=>this.props.navigation.navigate('Spring')}/>
          <Button easing='Multiple Animations' onPress={()=>this.props.navigation.navigate('Multiple')}/>
          <Button easing='Crash' onPress={()=> this.crashIt()}/>
         
          
      	</ScrollView>
      </Animated.View>
    );
  }
}


const Button = ({onPress, easing}) => (
	<TouchableHighlight style={styles.button}  onPress={onPress}>
    <Text>{easing}</Text>
  </TouchableHighlight>
)

var styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  button: {
  	height: 60,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#ededed',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  block: {
  	width: 50,
    height: 50,
    backgroundColor: 'red'
  }
});

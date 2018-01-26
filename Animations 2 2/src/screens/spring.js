import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Easing,
  Animated,
  Platform,
  TouchableOpacity,
  TouchableHighlight,
  NativeModules,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';


// you can set your style right here, it'll be propagated to application


const {width,height} = Dimensions.get('window');
export default class Spring extends Component {

  constructor (props) {
  super(props)
  this.renderBackBtn = this.renderBackBtn.bind(this);
  this.pressMe = this.pressMe.bind(this);
  this.springValue = new Animated.Value(0.3)
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
pressMe(){
  //alert('I am pressed');
  var ARManager = NativeModules.ARManager;
  ARManager.showARKit();
}
componentDidMount () {
this.spring()
}
spring () {
  this.springValue.setValue(0.3)
  Animated.spring(
    this.springValue,
    {
      toValue: 1,
      friction: 1
    }
  ).start()
}

render () {
return (
  <View style={styles.container}>
  {this.renderBackBtn()}
  <View style={styles.midContainer}>
  
  <Text
    style={{marginBottom: 100}}
    onPress={this.spring.bind(this)}>Spring</Text>
    <Animated.Image
      style={{ width: 227, height: 200, transform: [{scale: this.springValue}] }}
      source={{uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png'}}/>
  </View>
</View>
);
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  midContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backBtn:{
    marginLeft: 20,
    marginTop: 20 ,
    width : 80 ,
    height : 40
  }
})

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Easing,
  Animated,
  Platform,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView
} from 'react-native';


const {width,height} = Dimensions.get('window');




export default class Spin extends Component {

  constructor () {
  super()
  this.spinValue = new Animated.Value(0)
}



componentDidMount () {
this.spin()

setTimeout((() => {
  if (this.refs.progBarWithBuffer) {
    this.refs.progBarWithBuffer.buffer = 0.8;
  }
}), 1000);
setTimeout((() => {
  if (this.refs.progBar && this.refs.progBarWithBuffer) {
    this.refs.progBar.progress = 0.6;
    this.refs.progBarWithBuffer.progress = 0.6;
  }
}), 1600);

}

renderBackBtn(){
  if (Platform.OS == 'ios'){
    return(
      <TouchableOpacity style = {styles.backBtn} onPress ={()=> this.props.navigation.goBack()}>
      <Text>BACK</Text></TouchableOpacity>
    )
  }else{
    return(
      <View />
    )
  }
}


spin () {
this.spinValue.setValue(0)
Animated.timing(
this.spinValue,
{
  toValue: 1,
  duration: 4000,
  easing: Easing.linear
}
).start(() => this.spin())
}

render () {
const spin = this.spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg']
})
return (
  <View style={styling.container}>
  {this.renderBackBtn()}
  <View style={styling.midContainer}>
    <Animated.Image
      style={{
        width: 227,
        height: 200,
        transform: [{rotate: spin}] }}
        source={{uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png'}}
    />
    </View>
 </View>
);
}
}


const styling = StyleSheet.create({
  container: {
    flex: 1,
  }, midContainer:{
   marginTop:20,
   width:width,
   height:200,
    alignItems: 'center'
  },
  backBtn:{
    marginLeft: 20,
    marginTop: 20 ,
    width : 80 ,
    height : 40
  }
})

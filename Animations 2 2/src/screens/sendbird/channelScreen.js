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
  ScrollView,
  Image
} from 'react-native';



export default class ChannelScreen extends Component {

  constructor (props) {
  super(props)
  this.renderBackBtn = this.renderBackBtn.bind(this);
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


render () {
return (
  <View style={styles.container}>
  {this.renderBackBtn()}
  <View style={styles.container}>
  <Text>Logged in Sendbird successfully</Text>
  </View>
</View>
);
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backBtn:{
    marginLeft: 20,
    marginTop: 20 ,
    width : 80 ,
    height : 40
  },subContainer: {
    flex: 1 , 
    justifyContent: 'center',
    alignItems: 'center'
  }
})

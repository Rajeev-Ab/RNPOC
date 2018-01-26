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
  Image,
  TouchableHighlight,
  ScrollView
} from 'react-native';

import RNIconic from 'react-native-iconic'

export default class MoreAnimation extends Component {

  constructor () {
    	super()
      this.animatedValue = new Animated.Value(0)
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

      render(){
        let shapes = []
    
    if (Platform.OS === "ios") {
      shapes = [
        RNIconic.Shapes.Default,
        RNIconic.Shapes.Add,
        RNIconic.Shapes.Minus,
        RNIconic.Shapes.Close,
        RNIconic.Shapes.Back,
        RNIconic.Shapes.Forward,
        RNIconic.Shapes.Menu,
        RNIconic.Shapes.Download,
        RNIconic.Shapes.Share,
        RNIconic.Shapes.DownBasic,
        RNIconic.Shapes.UpBasic,
        RNIconic.Shapes.Paused,
        RNIconic.Shapes.DownArrow,
        RNIconic.Shapes.RightTriangle,
        RNIconic.Shapes.LeftTriangle,
        RNIconic.Shapes.UpTriangle,
        RNIconic.Shapes.DownTriangle,
        RNIconic.Shapes.Ok,
        RNIconic.Shapes.Rewind,
        RNIconic.Shapes.FastForward,
        RNIconic.Shapes.Square
      ]
    } else if (Platform.OS === "android") {
      shapes = [
        RNIconic.Shapes.BURGER,
        RNIconic.Shapes.ARROW,
        RNIconic.Shapes.X,
        RNIconic.Shapes.CHECK
      ]
    }

    return(
      <View style={styles.container}>
      {this.renderBackBtn()}
    <View style={styles.containerNew}>
      <RNIconic shape={shapes} roundBackgroundColor={"#FFFFFF"} tintColor={"#fc4426"} size={100} selection={0} disable={false} lineThickness={5} />
    </View>
    </View>
    ) 
      }

 /* render() {
    const marginLeft = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 260]
    })
    return (
      <View style={styles.container}>
       {this.renderBackBtn()}
        <Animated.View style={[styles.block, {marginLeft} ]} />
        <ScrollView>
      		<Text style={{textAlign: 'center'}}>Scroll up for more animations</Text>
      		<Button easing='Bounce' onPress={this.animate.bind(this, Easing.bounce)} />
    		  <Button easing='Cubic' onPress={this.animate.bind(this, Easing.cubic)} />
          <Button easing='Back' onPress={this.animate.bind(this, Easing.back(2))} />
          <Button easing='Elastic' onPress={this.animate.bind(this, Easing.elastic(2))} />
      	  <Button easing='Ease' onPress={this.animate.bind(this, Easing.ease)} />
          <Button easing='InOut' onPress={this.animate.bind(this, Easing.inOut(Easing.quad))} />
          <Button easing='In' onPress={this.animate.bind(this, Easing.in(Easing.quad))} />
          <Button easing='Out' onPress={this.animate.bind(this, Easing.out(Easing.quad))} />
          <Button easing='Sin' onPress={this.animate.bind(this, Easing.sin)} />
		   <Button easing='Linear' onPress={this.animate.bind(this, Easing.linear)} />
      	  <Button easing='Quad' onPress={this.animate.bind(this, Easing.quad)} />

      	</ScrollView>
      </View>
    );
  }*/
}


const Button = ({onPress, easing}) => (
	<TouchableHighlight style={styles.button}  onPress={onPress}>
    <Text>{easing}</Text>
  </TouchableHighlight>
)

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
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
  backBtn:{
    marginLeft: 20,
    marginTop: 20 ,
    width : 80 ,
    height : 40
  },
  block: {
  	width: 50,
    height: 50,
    backgroundColor: 'red'
  },containerNew: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

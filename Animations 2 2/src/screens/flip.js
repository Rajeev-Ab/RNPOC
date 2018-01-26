import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TouchableOpacity,
  Animated
} from 'react-native';

export default class Flip extends Component {

  // constructor () {
  // super()
  //
  // }
  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
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


  flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }

  }

  render() {
    const frontAnimatedStyle = {
      transform: [
        { rotateX: this.frontInterpolate}
      ]
    }

    const backAnimatedStyle = {

      transform: [
        { rotateX: this.backInterpolate }
      ]
    }
    return (
      <View style={styles.container}>
      {this.renderBackBtn()}
        <View style={styles.midContainer}>
        <View>
          <Animated.View style={[frontAnimatedStyle,styles.flipCard ]}>
            <Text style={styles.flipText}>
              FRONT
            </Text>
          </Animated.View>
          <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
            <Text style={styles.flipText}>
              BACK
            </Text>
          </Animated.View>
        </View>
        <TouchableOpacity onPress={() => this.flipCard()}>
          <Text>Flip!</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flipCard: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor: "red",
    position: "absolute",
    top: 0
    },
  flipText: {
    width: 90,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  }, midContainer:{
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
});

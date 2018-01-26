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
  View
} from 'react-native';

const {width , height} = Dimensions.get('window');
import SpeechRecognizer from 'react-native-speech-recognizer';
import Tts from 'react-native-tts';
import Voice from 'react-native-voice';


import CustomNav from '../../component/customNav/customNav'

export default class SpeechRecognition extends Component {
    constructor(props){
        super(props);
        this.speak = this.speak.bind(this);
        this.state = {dummyText:'This is the dummy text to check text to speech functionality.This demo is in React Native.',result:''}
        if (Platform.OS !== 'ios'){
          Voice.onSpeechResults = this.onSpeechResults.bind(this);
        }
    }

    componentWillMount() {
      
      
  }

  onSpeechResults(e){
    //  alert('bhalu is'+JSON.stringify(e));
      this.setState({
        resultArray:e.value
      })
  
      if (this.state.resultArray.length > 0 ){
        this.setState({result:this.state.resultArray[0]});
      }
  
    //  alert(this.state.result);
    }


    async _buttonClick(){
      try{
          //More Locales will be available upon release.
          var spokenText = await SpeechAndroid.startSpeech("Speak yo", SpeechAndroid.GERMAN);
          ToastAndroid.show(spokenText , ToastAndroid.LONG);
      }catch(error){
          switch(error){
              case SpeechAndroid.E_VOICE_CANCELLED:
                  ToastAndroid.show("Voice Recognizer cancelled" , ToastAndroid.LONG);
                  break;
              case SpeechAndroid.E_NO_MATCH:
                  ToastAndroid.show("No match for what you said" , ToastAndroid.LONG);
                  break;
              case SpeechAndroid.E_SERVER_ERROR:
                  ToastAndroid.show("Google Server Error" , ToastAndroid.LONG);
                  break;
              /*And more errors that will be documented on Docs upon release*/
          }
      }
  }

componentDidMount(){
  if (Platform.OS == 'ios'){
    Tts.addEventListener('tts-start', (event) => console.log("start", event));
    Tts.addEventListener('tts-finish', (event) => console.log("finish", event));
    Tts.addEventListener('tts-cancel', (event) => console.log("cancel", event));
    
    Tts.setDefaultLanguage('en-US');
    
    Tts.setDefaultPitch(1.0);
    SpeechRecognizer.init(result=>this.setState({result}));
  }


}
componentWillUnmount() {
  if (Platform.OS == 'ios'){
  SpeechRecognizer.end();
  }
}

startRecognizer(){
  Voice.start('en-US');
  this.setState({isStarted:true});
}

onSpeechStop(){
  Voice.stop();
  this.setState({isStarted:false});
}

speak(){
  Tts.speak(this.state.dummyText);
}

startRecognizer(){
  SpeechRecognizer.start('eng');
  this.setState({result:'The text would appear here'});
}

renderMainScreen(){
  if (Platform.OS == 'ios'){
    return(
<View style={styles.subContainer}>
        <View style={styles.TextContainer}>
         <Text style = {{fontSize: 20,textAlign:'center' }} multiline = {true} >{this.state.dummyText}</Text>
        </View>

        <TouchableOpacity style = {styles.btnContainer} onPress = {()=> this.speak()}>
         <Text style={[styles.hintText, {color:'gray' ,fontWeight:'bold', marginTop:0}]}>Speak</Text>
         </TouchableOpacity>

         <Text multiline={true} style={[styles.hintText, {color:'gray',width:width*0.80 ,fontWeight:'normal',marginTop:70,fontSize:18}]}>Press , hold and then speak to check speech recognition</Text>
         
         <TouchableOpacity  style = {[styles.btnContainer,{marginTop:10}]}
        onPressIn={()=> SpeechRecognizer.start('eng')} 
        onPressOut={()=> SpeechRecognizer.finish()}>
        <Text style={[styles.hintText, {color:'gray' ,fontWeight:'bold', marginTop:0}]}>Press n hold</Text>
         
    </TouchableOpacity>
    <Text style = {{marginTop:40, fontSize:20}}>{this.state.result}</Text>
    </View>
    )
  }else{
return(
  <View style={styles.subContainer}>
  <View style={styles.TextContainer}>
   <Text style = {{fontSize: 20,textAlign:'center' }} multiline = {true} >{this.state.dummyText}</Text>
  </View>

  <TouchableOpacity style = {styles.btnContainer} onPress = {()=> this.speak()}>
   <Text style={[styles.hintText, {color:'gray' ,fontWeight:'bold', marginTop:0}]}>Speak</Text>
   </TouchableOpacity>

<Text style = {{fontSize: 20, width:width*0.80,marginTop:20,textAlign:'center' }} multiline = {true} >Please tap on start to start speech recognition and then tap on stop to get result</Text>
 {this.renderButton()}
<Text style = {{marginTop:20, fontSize:20}}>{this.state.result}</Text>
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
  },
  subContainer:{
    flex: 1,
    alignItems: 'center'
  },
  TextContainer:{
    width: width * 0.80 , 
    height : 100,
    borderWidth:2.0,
    borderRadius :4 ,
    top : 40,
    borderColor: 'gray',
    justifyContent: 'center' ,
    alignItems: 'center'
  },hintText : {
    width : null,
    fontSize: width*0.06,
    textAlign: 'center',
    marginTop: 20,
    backgroundColor: "transparent",
    color: 'white',
  },
  btnContainer : {
      marginTop : 100 ,
      width : width*0.60,
      height:50,
      justifyContent: 'center',
      alignItems:'center' ,
      borderRadius: 25,
      backgroundColor:'black',
  }
});


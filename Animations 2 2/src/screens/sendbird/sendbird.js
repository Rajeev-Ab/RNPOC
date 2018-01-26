/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Dimensions,View,Keyboard} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import CustomNav from '../../component/customNav/customNav'
import SendBird from 'sendbird';


import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
const {width , height} = Dimensions.get('window');

export default class SendbirdScreen extends Component {
    constructor(props){
        super(props);
       
        this.state = {openDrawer:props.openDrawer,userId: '',
        nickname: '',
        error: '',
        showLoader:false
    };
       
    }

    _userIdChanged = (userId) => {
        this.setState({ userId });
    }

    _nicknameChanged = (nickname) => {
        this.setState({ nickname });
    }

    

   _onButtonPress = () => {
    Keyboard.dismiss(); 
       this.setState({showLoader:true});
        const { userId, nickname } = this.state;
        const sb = new SendBird({ 'appId': '9DA1B1F4-0BE6-4DA8-82C5-2E81DAB56F23' });
        sb.connect(userId, (user, error) => {
            if (error) {
                this.setState({ error });
            } else {
                sb.updateCurrentUserInfo(nickname, null, (user, error) => {
                    if (error) {
                        this.setState({ error });
                    } else {
                        this.setState({
                            userId: '',
                            nickname: '',
                            error: ''
                        }, () => {
                            this.setState({showLoader:false});
                            this.props.navigation.navigate('ChannelScreen');
                        });
                    }
                })
            }
        })

    }

   
renderLoader(){
    if (this.state.showLoader){
        return(
            <View style={{width:width,height:height,position:'absolute',justifyContent:'center',alignItems:'center',backgroundColor:'rgba(1,1,1,0.6)'}}>
             <Bubbles style={{marginLeft: 100}}size={10} color="green" />
            </View>
        )
    }else{
        return(
            <View/>
        )
    }
}
  render() {
    return (
      <View style={styles.container}>
     <CustomNav  openDrawer = {()=>this.props.openDrawer}/>
     <View style={styles.containerStyle}>
                    <FormLabel>User ID</FormLabel>
                    <FormInput
                        value={this.state.userId}
                        onChangeText={this._userIdChanged}
                    />
                </View>
                <View style={styles.containerStyle}>
                    <FormLabel>Nickname</FormLabel>
                    <FormInput
                        value={this.state.nickname}
                        onChangeText={this._nicknameChanged}
                    />
                </View>
                <View style={styles.containerStyle}>
                    <Button
                        buttonStyle={{backgroundColor: '#2096f3'}}
                        title='Connect' 
                        onPress={this._onButtonPress}
                    />
                </View>
                <View style={styles.containerStyle}>
                    <FormValidationMessage>{this.props.error}</FormValidationMessage>
                </View>

                {this.renderLoader()}
      </View>
    );
  }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor:'white'
      },containerStyle: {
        marginTop: 20
    }
}



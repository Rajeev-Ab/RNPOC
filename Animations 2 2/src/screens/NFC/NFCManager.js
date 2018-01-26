import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    Platform,
    TouchableOpacity,
    Linking
} from 'react-native';
import NfcManager, {NdefParser} from 'react-native-nfc-manager';
import CustomNav from '../../component/customNav/customNav'
export default class NFCManager extends Component {
    constructor(props) {
        super(props);
       
        this._startDetection = this._startDetection.bind(this);
        this._stopDetection = this._stopDetection.bind(this);
        this._clearMessages = this._clearMessages.bind(this);
        this._goToNfcSetting = this._goToNfcSetting.bind(this);
        this._startDetection = this._startDetection.bind(this);
        this._parseUri = this._parseUri.bind(this);
        this._onTagDiscovered = this._onTagDiscovered.bind(this);
        this._startNfc = this._startNfc.bind(this);




        this.state = {
            supported: true,
            enabled: false,
            tag: {},
        }
    }

    componentDidMount() {
        NfcManager.isSupported()
            .then(supported => {
                this.setState({ supported });
                if (supported) {
                    this._startNfc();
                }
            })
    }

    render() {
        let { supported, enabled, tag } = this.state;
        return (
            <View style={{ flex: 1}}>
                 <CustomNav  openDrawer = {()=>this.props.openDrawer}/>
                 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{`Is NFC supported ? ${supported}`}</Text>
                <Text>{`Is NFC enabled (Android only)? ${enabled}`}</Text>

                <TouchableOpacity style={{ marginTop: 20 }} onPress={this._startDetection}>
                    <Text style={{ color: 'blue' }}>Start Tag Detection</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ marginTop: 20 }} onPress={this._stopDetection}>
                    <Text style={{ color: 'red' }}>Stop Tag Detection</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ marginTop: 20 }} onPress={this._clearMessages}>
                    <Text>Clear</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ marginTop: 20 }} onPress={this._goToNfcSetting}>
                    <Text >Go to NFC setting</Text>
                </TouchableOpacity>

                <Text style={{ marginTop: 20 }}>{`Current tag JSON: ${JSON.stringify(tag)}`}</Text>
            </View>
        </View>
        )
    }

    _startNfc() {
        NfcManager.start({
            onSessionClosedIOS: () => {
                console.log('ios session closed');
            }
        })
            .then(result => {
                console.log('start OK', result);
            })
            .catch(error => {
                console.warn('start fail', error);
                this.setState({supported: false});
            })

        if (Platform.OS === 'android') {
            NfcManager.getLaunchTagEvent()
                .then(tag => {
                    console.log('launch tag', tag);
                    if (tag) {
                        this.setState({ tag });
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            NfcManager.isEnabled()
                .then(enabled => {
                    this.setState({ enabled });
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    _onTagDiscovered = tag => {
        console.log('Tag Discovered', tag);
        this.setState({ tag });
        let url = this._parseUri(tag);
        if (url) {
            Linking.openURL(url)
                .catch(err => {
                    console.warn(err);
                })
        }
    }

    _startDetection = () => {
        NfcManager.registerTagEvent(this._onTagDiscovered)
            .then(result => {
                console.log('registerTagEvent OK', result)
            })
            .catch(error => {
                console.warn('registerTagEvent fail', error)
            })
    }

    _stopDetection = () => {
        NfcManager.unregisterTagEvent()
            .then(result => {
                console.log('unregisterTagEvent OK', result)
            })
            .catch(error => {
                console.warn('unregisterTagEvent fail', error)
            })
    }

    _clearMessages = () => {
        this.setState({tag: null});
    }

    _goToNfcSetting = () => {
        if (Platform.OS === 'android') {
            NfcManager.goToNfcSetting()
                .then(result => {
                    console.log('goToNfcSetting OK', result)
                })
                .catch(error => {
                    console.warn('goToNfcSetting fail', error)
                })
        }
    }

    _parseUri = (tag) => {
        let result = NdefParser.parseUri(tag.ndefMessage[0]),
            uri = result && result.uri;
        if (uri) {
            console.log('parseUri: ' + uri);
            return uri;
        }
        return null;
    }
}


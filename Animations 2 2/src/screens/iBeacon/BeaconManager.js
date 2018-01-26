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
  ListView,
  Dimensions,
  DeviceEventEmitter,
  TouchableOpacity,
  View
} from 'react-native';
//merchant.com.wildnet.react
const {width , height} = Dimensions.get('window');
import Beacons from 'react-native-beacons-manager';
//import BluetoothState         from 'react-native-bluetooth-state';
import CustomNav from '../../component/customNav/customNav'
export default class BeaconManager extends Component {
    constructor(props){
        super(props);
       

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2 }
          );
          this.state = {
            bluetoothState: '',
            // region information
            identifier: 'GemTot for iOS',
            uuid: '6665542b-41a1-5e00-931c-6a82db9b78c1',
            // React Native ListView datasource initialization
            dataSource: ds.cloneWithRows([]) , 
            openDrawer:props.openDrawer
          };
    }

    
  componentWillMount(){
    //
    // ONLY non component state aware here in componentWillMount
    //
    // Request for authorization while the app is open
    Beacons.requestWhenInUseAuthorization();
    // Define a region which can be identifier + uuid,
    // identifier + uuid + major or identifier + uuid + major + minor
    // (minor and major properties are numbers)
    const region = {
      identifier: this.state.identifier,
      uuid: this.state.uuid
    };
    // Range for beacons inside the region
    Beacons.startRangingBeaconsInRegion(region);
    // Beacons.startUpdatingLocation();
  }

  componentDidMount() {
    //
    // component state aware here - attach events
    //
    // Ranging: Listen for beacon changes
    this.beaconsDidRange = DeviceEventEmitter.addListener(
      'beaconsDidRange',
      (data) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data.beacons)
        });
      }
    );

    // listen bluetooth state change event
   
  }

  componentWillUnMount(){
    this.beaconsDidRange = null;
  }

  renderRow = rowData => {
    return (
      <View style={styles.row}>
        <Text style={styles.smallText}>
          UUID: {rowData.uuid ? rowData.uuid  : 'NA'}
        </Text>
        <Text style={styles.smallText}>
          Major: {rowData.major ? rowData.major : 'NA'}
        </Text>
        <Text style={styles.smallText}>
          Minor: {rowData.minor ? rowData.minor : 'NA'}
        </Text>
        <Text>
          RSSI: {rowData.rssi ? rowData.rssi : 'NA'}
        </Text>
        <Text>
          Proximity: {rowData.proximity ? rowData.proximity : 'NA'}
        </Text>
        <Text>
          Distance: {rowData.accuracy ? rowData.accuracy.toFixed(2) : 'NA'}m
        </Text>
      </View>
    );
  }

   
  render() {
    const { bluetoothState, dataSource } =  this.state;
    return (
      <View style={styles.container}>
        <CustomNav  openDrawer = {()=>this.props.openDrawer}/>
        <View style={styles.subContainer}>
        <Text style={styles.btleConnectionStatus}>
          Bluetooth connection status: { bluetoothState ? bluetoothState  : 'NA' }
        </Text>
        <Text style={styles.headline}>
          All beacons in the area
        </Text>
        <ListView
          dataSource={ dataSource }
          enableEmptySections={ true }
          renderRow={this.renderRow}
        />
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  subContainer :{
    flex: 1,
    paddingTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  btleConnectionStatus: {
    fontSize: 20,
    paddingTop: 20
  },
  headline: {
    fontSize: 20,
    paddingTop: 20
  },
  row: {
    padding: 8,
    paddingBottom: 16
  },
    smallText: {
    fontSize: 11
  }
  
});

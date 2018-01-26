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
  TouchableOpacity,
  TouchableHighlight,
  ScrollView
} from 'react-native';

const MK = require('react-native-material-kit');
const appStyles = require('./styles');

const {
    MKButton,
    MKSpinner,
    mdl,
    MKProgress,
    MKColor,
    MKTextField,
  MKSlider,
  MKRangeSlider,
  setTheme,
  MKIconToggle,
  MKSwitch,
  getTheme,
  MKRadioButton,
  MKCheckbox,
  } = MK;




  const styles = Object.assign({}, appStyles, StyleSheet.create({
    buttonText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: 'white',
    },
    fab: {
      // width: 200,
      // height: 200,
      // borderRadius: 100,
    },progress: {
        width: 150,
        //height: 2,
      },
      spinner: {
        //width: 22,
        //height: 22,
      },
      slider: {
    width: 130,
  },col: {
    flex: 1,
    flexDirection: 'column',
    // alignItems: 'center', // this will prevent TFs from stretching horizontal
    marginLeft: 7, marginRight: 7,
    // backgroundColor: MKColor.Lime,
  },
  textfield: {
    height: 28,  // have to do it on iOS
    marginTop: 32,
  },
  textfieldWithFloatingLabel: {
    height: 48,  // have to do it on iOS
    marginTop: 10,
  }, toggleText: {
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#616161',
  },
  toggleOnText: {
    color: getTheme().primaryColor,
  },
  switch: {
    marginTop: 2,
    // marginBottom: 5,
  },
  appleSwitch: {
    marginTop: 7,
    marginBottom: 7,
  },
  }));

  const Textfield = MKTextField.textfield()
  .withPlaceholder('Text...')
  .withStyle(styles.textfield)
  .withTextInputStyle({flex: 1})
  .build();

const TextfieldWithFloatingLabel = MKTextField.textfieldWithFloatingLabel()
  .withPlaceholder('Number...')
  .withStyle(styles.textfieldWithFloatingLabel)
  .withTextInputStyle({flex: 1})
  .withFloatingLabelFont({
    fontSize: 10,
    fontStyle: 'italic',
    fontWeight: '200',
  })
  .withKeyboardType('numeric')
  .build();

const ColoredTextfield = mdl.Textfield.textfield()
  .withPlaceholder('Text...')
  .withStyle(styles.textfield)
  .withTintColor(MKColor.Lime)
  .withTextInputStyle({color: MKColor.Orange, flex: 1})
  .build();

const PasswordInput = mdl.Textfield.textfieldWithFloatingLabel()
  .withPassword(true)
  .withPlaceholder('Password')
  .withDefaultValue('!123')
  .withHighlightColor(MKColor.Lime)
  .withStyle(styles.textfieldWithFloatingLabel)
  .withTextInputStyle({flex: 1})
  .withOnFocus(() => console.log('Focus'))
  .withOnBlur(() => console.log('Blur'))
  .withOnEndEditing((e) => console.log('EndEditing', e.nativeEvent.text))
  .withOnSubmitEditing((e) => console.log('SubmitEditing', e.nativeEvent.text))
  .withOnTextChange((e) => console.log('TextChange', e))
  .withOnChangeText((e) => console.log('ChangeText', e))
  .build();

  const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build();
  
  const ColoredRaisedButton = MKButton.coloredButton()
    .withText('BUTTON')
    .withOnPress(() => {
      console.log("Hi, it's a colored button!");
    })
    .build();
  const AccentColoredRaisedButton = MKButton.accentColoredButton()
    .build();
  const PlainRaisedButton = MKButton.button()
    .withText('BUTTON')
    .build();
  const FlatButton = MKButton.flatButton()
    .withText('BUTTON')
    .build();
  const ColoredFlatButton = MKButton.coloredFlatButton()
    .withText('BUTTON')
    .build();
  const AccentColoredFlatButton = MKButton.accentColoredFlatButton()
    .withText('BUTTON')
    .build();
  
  const ColoredFab = MKButton.coloredFab()
    .withStyle(styles.fab)
    .build();
  const AccentColoredFab = MKButton.accentColoredFab()
    .withStyle(styles.fab)
    .build();
  const PlainFab = MKButton.plainFab()
    .withStyle(styles.fab)
    .build();




    class ValueText extends Component {
        constructor(props) {
          super(props);
          this.state = {
            curValue: props.initial,
          };
        }
      
        onChange(curValue) {
          this.setState({curValue});
        }
      
        render() {
          return (
            <Text style={styles.legendLabel}>
              {this.state.curValue} ({this.props.rangeText})
            </Text>
          );
        }
      }


export default class MetarialScreen extends Component {

  constructor () {
  super()
  this.radioGroup = new MKRadioButton.Group();
  
 
}

componentDidMount () {
    const slider = this.refs.sliderWithValue;
    const ranged = this.refs.rangeSlider;

    setTimeout((() => {
      slider.value = 75;
      ranged.maxValue = 95;
    }), 1000);

    setTimeout((() => {
        if (this.refs.defaultInput) {
          this.refs.defaultInput.focus();
        }
      }), 1000);
}

_onChecked(event) {
    console.log(`icon toggle is checked? ${event.checked}`);
  }

  _onToggleClicked() {
    console.log('you clicked a toggle');
  }

renderBackBtn(){
  if (Platform.OS == 'ios'){
    return(
      <TouchableOpacity style = {styles.styling} onPress ={()=> this.props.navigation.goBack()}>
      <Text>BACK</Text></TouchableOpacity>
    )
  }else{
    return(
      <View />
    )
  }
}




render () {

return (

 

  <ScrollView style={styles.scrollView}
                  >
                   {this.renderBackBtn()}
        <View style={styles.row}>
          <View style={styles.col}>
            <PlainRaisedButton/>
            <Text style={styles.legendLabel}>Raised button</Text>
          </View>
          <View style={styles.col}>
            <ColoredRaisedButton/>
            <Text style={styles.legendLabel}>Colored</Text>
          </View>
          <View style={styles.col}>
            <AccentColoredRaisedButton>
              <Text pointerEvents="none" style={styles.buttonText}>BUTTON</Text>
            </AccentColoredRaisedButton>
            <Text style={styles.legendLabel}>Accent colored</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <PlainFab>
              <Image pointerEvents="none" source={require('../img/plus_dark.png')} />
            </PlainFab>
            <Text style={styles.legendLabel}>Plain FAB</Text>
          </View>
          <View style={styles.col}>
            <ColoredFab>
              <Image pointerEvents="none" source={require('../img/plus_white.png')} />
            </ColoredFab>
            <Text style={styles.legendLabel}>Colored</Text>
          </View>
          <View style={styles.col}>
            <AccentColoredFab>
              <Image pointerEvents="none" source={require('../img/plus_white.png')} />
            </AccentColoredFab>
            <Text style={styles.legendLabel}>Accent colored</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <FlatButton/>
            <Text style={styles.legendLabel}>Flat button</Text>
          </View>
          <View style={styles.col}>
            <ColoredFlatButton/>
            <Text style={styles.legendLabel}>Colored</Text>
          </View>
          <View style={styles.col}>
            <AccentColoredFlatButton/>
            <Text style={styles.legendLabel}>Accent colored</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.col}>
            <MKProgress
              ref="progBar"
              style={styles.progress}
              progress={0.2}
              />
            <Text style={styles.legendLabel}>Default progress bar</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <MKProgress.Indeterminate
              style={styles.progress}
            />
            <Text style={styles.legendLabel}>Indeterminate</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <MKProgress
              ref="progBarWithBuffer"
              style={styles.progress}
              progress={0.2}
              buffer={0.3}
              />
            <Text style={styles.legendLabel}>Buffering</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <MKSpinner style={styles.spinner}/>
            <Text style={styles.legendLabel}>Default spinner</Text>
          </View>
          <View style={styles.col}>
            <SingleColorSpinner/>
            <Text style={styles.legendLabel}>Single color</Text>
          </View>
        </View>


        <View style={styles.row}>
          <View style={styles.col}>
            <MKSlider style={styles.slider}
            />
            <Text style={styles.legendLabel}>Slider</Text>
          </View>
          <View style={styles.col}>
            <MKSlider
              ref='sliderWithValue'
              min={10}
              max={100}
              value={25}
              style={styles.slider}
              onChange={(curValue) => this.refs.valueText.onChange(curValue.toFixed(2))}
              />
            <ValueText ref="valueText" initial="25.00" rangeText="10~100" />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <MKRangeSlider style={styles.slider}/>
            <Text style={styles.legendLabel}>Range Slider</Text>
          </View>
          <View style={styles.col}>
            <MKRangeSlider
              ref="rangeSlider"
              min={10}
              max={100}
              minValue={20}
              maxValue={75}
              style={styles.slider}
              onChange={(curValue) => this.refs.rangeValueText.onChange(curValue.min.toFixed(2) + '-' + curValue.max.toFixed(2))}
              />
            <ValueText ref="rangeValueText" initial="20.00-75.00" rangeText="10~100" />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.col}>
            <Textfield/>
            <Text style={styles.legendLabel}>Textfield</Text>
          </View>
          <View style={styles.col}>
            <TextfieldWithFloatingLabel ref="defaultInput"/>
            <Text style={styles.legendLabel}>With floating label</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <ColoredTextfield/>
            <Text style={styles.legendLabel}>Textfield</Text>
          </View>
          <View style={styles.col}>
            <PasswordInput/>
            <Text style={styles.legendLabel}>With floating label</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.col}>
            <MKIconToggle
              checked={true}
              onCheckedChange={this._onChecked}
              onPress={this._onToggleClicked}
            >
              <Text state_checked={true}
                    style={[styles.toggleText, styles.toggleOnText]}>T</Text>
              <Text style={styles.toggleText}>T</Text>
            </MKIconToggle>
            <Text style={styles.legendLabel}>Icon on</Text>
          </View>
          <View style={styles.col}>
            <MKIconToggle>
              <Text state_checked={true}
                    style={[styles.toggleText, styles.toggleOnText]}>B</Text>
              <Text style={styles.toggleText}>B</Text>
            </MKIconToggle>
            <Text style={styles.legendLabel}>Icon off</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <MKSwitch checked={true}
                        style={styles.switch}
            />
            <Text style={styles.legendLabel}>Switch on</Text>
          </View>
          <View style={styles.col}>
            <MKSwitch style={styles.appleSwitch}
                        trackSize={30}
                        trackLength={52}
                        onColor="rgba(255,152,0,.3)"
                        thumbOnColor={MKColor.Orange}
                        rippleColor="rgba(255,152,0,.2)"
                        onPress={() => console.log('orange switch pressed')}
                        onCheckedChange={(e) => console.log('orange switch checked', e)}
              />
            <Text style={styles.legendLabel}>Switch off</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <MKRadioButton
              checked={true}
              group={this.radioGroup}
              />
            <Text style={styles.legendLabel}>First</Text>
          </View>
          <View style={styles.col}>
            <MKRadioButton group={this.radioGroup}/>
            <Text style={styles.legendLabel}>Second</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <MKCheckbox checked={true} />
            <Text style={styles.legendLabel}>Checked</Text>
          </View>
          <View style={styles.col}>
            <MKCheckbox />
            <Text style={styles.legendLabel}>Unchecked</Text>
          </View>
        </View>

      </ScrollView>

  

);
}
}


const styling = StyleSheet.create({
  container: {
    flex: 1,
  }, midContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backBtn:{
    marginLeft: 20,
    marginTop: 40 ,
    width : 80 ,
    height : 40,
    
  }
})

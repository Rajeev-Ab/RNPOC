'use strict'


import SimpleAnimations from '../screens/simpleAnimations'
import Spin from '../screens/spin'
import Spring from '../screens/spring'
import Multiple from '../screens/multipleAnimations'
import Flip from '../screens/flip'
import MoveWithFinger from '../screens/moveWithFinger'
import MoreAnimation from '../screens/MoreAnimation/MoreAnimation'
import LandingScreen from '../screens/LandingScreen/LandingScreen'
import DemoPage  from '../screens/Preview/src/DemoPage'
import DrawerScreen from '../screens/Drawer/Drawer/Drawer'
import ChannelScreen from '../screens/sendbird/channelScreen'
//import Accelerometer from '../screens/Sensor/Accelerometer'
import MetarialScreen from '../screens/metarialScreen'
import { StackNavigator } from 'react-navigation';

const Animations = StackNavigator({
LandingScreen:{screen:LandingScreen},
DrawerScreen: {screen: DrawerScreen},
Spin: {screen: Spin},
MoreAnimation:{screen:MoreAnimation},
Spring: {screen: Spring},
Multiple: {screen: Multiple},
MoveWithFinger: {screen: MoveWithFinger},
LandingScreen:{screen:LandingScreen},
Flip: {screen: Flip},
ChannelScreen:{screen:ChannelScreen},
MetarialScreen:{screen:MetarialScreen},
DemoPage:{screen: DemoPage}

},{
    headerMode: 'none'
});

export default Animations;

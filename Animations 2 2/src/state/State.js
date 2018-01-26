'use strict'

// Do not call this directly to set state, instead use the GetState/SetState functions.
// Those modules have functions written to update state and ONLY those modules should
// call on the STATE module.

// 'http://192.168.5.145:8080'
// 'http://worbix.contata.co.in'

const STATE = {
userDetail:{} ,
geofenceArray:[] 
};

export default STATE;

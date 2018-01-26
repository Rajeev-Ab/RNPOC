'use strict'

import assign from 'object-assign';
import EventEmitter from 'events';

const FbUserDetail = assign(EventEmitter.prototype, {

  addFbUserDetailListener: function(cb){
    this.on('FBUSER_DETAIL_CHANGE',cb);
  },
  removeFbUserDetailListener: function(cb){
    this.removeListener('FBUSER_DETAIL_CHANGE',cb);
  },
});

export default FbUserDetail;

'use strict'

import STATE from './State';

export default function getStateItem(stateKey){
  // used to get single item from STATE argument stateKey must be STRING!!
  return STATE[stateKey]
}

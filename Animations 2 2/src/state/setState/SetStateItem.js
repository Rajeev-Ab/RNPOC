'use strict'

import STATE from '../State';

export default function setStateItem(key,value){
  // used to set single item in STATE, pass key argument as STRING!!!
  return (
    STATE[key] = value
  )
}

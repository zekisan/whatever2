import { combineReducers } from 'redux'

import layoutHeader from './layoutHeader';
import layoutTrailer from './layoutTrailer';

const rootReducer = combineReducers({
  layoutHeader,
  layoutTrailer
})

export default rootReducer;

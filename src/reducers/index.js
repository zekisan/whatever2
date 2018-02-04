import { combineReducers } from 'redux'

import layoutHeader from './layoutHeader';
import layoutTrailer from './layoutTrailer';
import layoutDetail from './layoutDetail';

const rootReducer = combineReducers({
  layoutHeader,
  layoutTrailer,
  layoutDetail,
})

export default rootReducer;

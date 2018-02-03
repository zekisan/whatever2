import { combineReducers } from 'redux'

import layoutHeader from './layoutHeader';
import layoutHeader2 from './layoutHeader';

const rootReducer = combineReducers({
  layoutHeader,
  layoutHeader2,
})

export default rootReducer;

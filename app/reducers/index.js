// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import app from './appReducer';

const rootReducer = combineReducers({
  fk: app,
  routing
});

export default rootReducer;

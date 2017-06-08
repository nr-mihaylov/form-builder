// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import formReducer from './formReducer';

const rootReducer = combineReducers({
  forms: formReducer,
  routing
});

export default rootReducer;

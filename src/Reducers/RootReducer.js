import { combineReducers } from 'redux';

import alert from './Alert';
import config from './Config';
import loading from './Loading';
import article from './Article';

const rootReducer = combineReducers({
  alert,
  config,
  loading,
  article
});

export default rootReducer;

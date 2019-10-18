import { combineReducers } from 'redux';

import alert from './Alert';
import loading from './Loading';
import article from './Article';

const rootReducer = combineReducers({
  alert,
  loading,
  article
});

export default rootReducer;
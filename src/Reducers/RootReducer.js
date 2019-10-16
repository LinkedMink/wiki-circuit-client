import { combineReducers } from 'redux';

import alert from './Alert';
import loading from './Loading';
import article from './Article';
import job from './Job';

const rootReducer = combineReducers({
  alert,
  loading,
  article,
  job
});

export default rootReducer;
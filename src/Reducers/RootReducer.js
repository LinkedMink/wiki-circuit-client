import { combineReducers } from 'redux';

import alert from './Alert';
import loading from './Loading';
import articleData from './ArticleData';

const rootReducer = combineReducers({
  alert,
  loading,
  articleData
});

export default rootReducer;
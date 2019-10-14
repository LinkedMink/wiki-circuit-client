import { SAVE_ARTICLE_JOB, SAVE_ARTICLE_DATA } from '../Actions/ArticleData';

function articleData(state = {}, action) {
  if (action.type === SAVE_ARTICLE_JOB) {
    let copyArticles = Object.assign({}, state);
    copyArticles[action.payload.id] = action.payload;
    return copyArticles;
  } if (action.type === SAVE_ARTICLE_DATA) {
    let copyArticles = Object.assign({}, state);
    copyArticles[action.payload.id] = action.payload;
    return copyArticles;
  } else {
    return state;
  }
}

export default articleData;
import { SAVE_ARTICLE_DATA } from '../Actions/Article';

function article(state = {}, action) {
  if (action.type === SAVE_ARTICLE_DATA) {
    let copyArticles = Object.assign({}, state);
    copyArticles[action.payload.articleId] = action.payload.data;
    return copyArticles;
  } else {
    return state;
  }
}

export default article;
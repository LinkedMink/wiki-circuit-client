import { Reducer } from "redux";
import { ArticleAction, SAVE_ARTICLE_DATA } from "../Actions/ArticleAction";

export type ArticleMap = Record<string, Record<string, unknown>>;

export type ArticleMapReduced = ArticleMap | Record<string, never>;

const articleReducer: Reducer<ArticleMapReduced, ArticleAction> = (
  state: ArticleMapReduced = {},
  action: ArticleAction
): ArticleMapReduced => {
  if (action.type === SAVE_ARTICLE_DATA) {
    const copyArticles = Object.assign({}, state);
    copyArticles[action.payload.articleId] = action.payload.data;
    return copyArticles;
  } else {
    return state;
  }
};

export default articleReducer;

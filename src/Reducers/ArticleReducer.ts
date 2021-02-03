import { Reducer } from "redux";
import { ArticleAction, SAVE_ARTICLE_DATA } from "../Actions/ArticleAction";
import { ArticleJob, ArticleJobStart } from "../Constants/Scheduler";

export type ArticleMap = Record<string, ArticleJob | ArticleJobStart>;

export type ArticleMapReduced = ArticleMap | Record<string, never>;

const articleReducer: Reducer<ArticleMapReduced, ArticleAction> = (
  state: ArticleMapReduced = {},
  action: ArticleAction
): ArticleMapReduced => {
  if (action.type === SAVE_ARTICLE_DATA) {
    const copyArticles = Object.assign({}, state) as ArticleMap;
    copyArticles[action.payload.articleId] = action.payload.data;
    return copyArticles;
  } else {
    return state;
  }
};

export default articleReducer;

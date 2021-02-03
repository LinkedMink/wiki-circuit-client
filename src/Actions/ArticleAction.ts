import { Action } from "redux";
import { ArticleJob, ArticleJobStart } from "../Constants/Scheduler";

export const SAVE_ARTICLE_DATA = "SAVE_ARTICLE_DATA";
export type SaveArticleData = "SAVE_ARTICLE_DATA";

export interface ArticleData {
  articleId: string;
  data: ArticleJob | ArticleJobStart;
}

export interface ArticleAction extends Action<SaveArticleData> {
  type: SaveArticleData;
  payload: ArticleData;
}

export function saveArticleData(
  articleName: string,
  data: ArticleJob | ArticleJobStart
): ArticleAction {
  return {
    type: SAVE_ARTICLE_DATA,
    payload: {
      articleId: articleName,
      data: data,
    },
  };
}

import { Action } from "redux";

export const SAVE_ARTICLE_DATA = "SAVE_ARTICLE_DATA";
export type SaveArticleData = "SAVE_ARTICLE_DATA";

export interface ArticleData {
  articleId: string;
  data: Record<string, unknown>;
}

export interface ArticleAction extends Action<SaveArticleData> {
  type: SaveArticleData;
  payload: ArticleData;
}

export function saveArticleData(
  articleName: string,
  data: Record<string, unknown>
): ArticleAction {
  return {
    type: SAVE_ARTICLE_DATA,
    payload: {
      articleId: articleName,
      data: data,
    },
  };
}

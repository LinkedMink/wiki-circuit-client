export const SAVE_ARTICLE_DATA = 'SAVE_ARTICLE_DATA';

export function saveArticleData(data) {
  return { 
    type: SAVE_ARTICLE_DATA, 
    payload: data
  };
}

export const SAVE_ARTICLE_DATA = 'SAVE_ARTICLE_DATA';

export function saveArticleData(articleName, data) {
  return { 
    type: SAVE_ARTICLE_DATA, 
    payload: { 
      articleId: articleName,
      data: data
    }
  };
}

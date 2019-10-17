export const SAVE_ARTICLE_JOB = 'SAVE_ARTICLE_JOB';

export function saveArticleJob(articleName, data) {
  return { 
    type: SAVE_ARTICLE_JOB, 
    payload: { 
      articleId: articleName,
      data: data
    }
  };
}
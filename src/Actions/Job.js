export const SAVE_ARTICLE_JOB = 'SAVE_ARTICLE_JOB';

export function saveArticleJob(data) {
  return { 
    type: SAVE_ARTICLE_JOB, 
    payload: data
  };
}
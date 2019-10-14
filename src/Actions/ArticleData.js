export const SAVE_ARTICLE_JOB = 'SAVE_ARTICLE_JOB';
export const SAVE_ARTICLE_DATA = 'SAVE_ARTICLE_DATA';

export function saveArticleJob(data) {
  return { 
    type: SAVE_ARTICLE_JOB, 
    payload: data
  };
}

export function saveArticleData(data) {
  return { 
    type: SAVE_ARTICLE_DATA, 
    payload: data
  };
}

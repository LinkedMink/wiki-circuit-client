import { SAVE_ARTICLE_JOB } from '../Actions/Job';

function job(state = {}, action) {
  if (action.type === SAVE_ARTICLE_JOB) {
    let copyJobs = Object.assign({}, state);
    copyJobs[action.payload.articleId] = action.payload.data;
    return copyJobs;
  } else {
    return state;
  }
}

export default job;
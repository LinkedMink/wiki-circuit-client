import { connect } from "react-redux";

import VisualizationScreen from "../Components/Screens/VisualizationScreen";
import { saveArticleData } from "../Actions/Article";
import { saveArticleJob } from "../Actions/Job";
import { alertError } from "../Actions/Alert";
import { loadingStart, loadingReport, loadingEnd } from "../Actions/Loading";

const SERVER_BASE_URL = 'http://localhost:8080'
const JOB_PATH = '/job'
const RESULT_PATH = '/job/result'
const JOB_CHECK_INTERVAL = 2500

const MessagePrefixes = {
  NO_JOB: 'No job exist for the article:',
  NO_CACHE: 'No cache entry exist for the article:',
  IN_CACHE: 'Article data is in cache:',
  JOB_STARTED: 'Job already started'
};

function getHeaders() {
  return { 
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
}

function getCatchHandler(dispatch) {
  return (error) => {
    dispatch(loadingEnd());
    dispatch(alertError(error.message));
  };
}

function mapStateToProps (state, ownProps) {
  const job = state.job[ownProps.match.params.id];
  const article = state.article[ownProps.match.params.id];
  return {
    job: job,
    article: article
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const catchHandler = getCatchHandler(dispatch);
  
  const getJobResult = (articleName) => {
    const responseHandler = (json) => {
      if (json.status === 'success') {
        dispatch(saveArticleData(articleName, json.data));
      } else {
        dispatch(alertError("Failed to get job result"));
      }
  
      dispatch(loadingEnd());
    };
  
    const url = SERVER_BASE_URL + RESULT_PATH + '/' + articleName;
    const options = { 
      method: 'GET',
      headers: getHeaders()
    };
  
    return fetch(url, options)
      .then(response => response.json())
      .then(responseHandler)
      .catch(catchHandler);
  }

  return {
    getJobStatusToStore: (articleName, progress) => {
      dispatch(loadingStart(true));
      dispatch(loadingReport(progress));

      const responseHandler = (json) => {
        if (!json) {
          return;
        }

        if (json.data.status === 'complete') {
          dispatch(saveArticleJob(articleName, json.data));
          getJobResult(articleName);
        } else if (json.data.status === 'faulted') {
          dispatch(saveArticleJob(articleName, json.data));
          dispatch(loadingEnd());
          dispatch(alertError("Job failed mid-operation, check server logs"));
        } else if (json.message.startsWith(MessagePrefixes.NO_JOB)) {
          
        } else {
          json.data.progress = Math.ceil(json.data.progress * 100);
          dispatch(saveArticleJob(articleName, json.data));
        }
      };
    
      const url = SERVER_BASE_URL + JOB_PATH + '/' + articleName;
      const options = { 
        method: 'GET',
        headers: getHeaders()
      };
    
      const getJobStatus = () => {
        fetch(url, options)
          .then(response => response.json())
          .then(responseHandler)
          .catch(catchHandler);
      }

      setTimeout(getJobStatus, JOB_CHECK_INTERVAL);
    },
    getVisualizationDataToStore: (articleName) => {
      dispatch(loadingStart(true));

      const responseHandler = (json) => {
        if (json && json.status === 'success') {
          dispatch(saveArticleJob(articleName, { progress: 0 }));
        } else if (json && json.message) {
          if (json.message.startsWith(MessagePrefixes.IN_CACHE)) {
            getJobResult(articleName);
          } else if (json.message.startsWith(MessagePrefixes.JOB_STARTED)) {
            dispatch(saveArticleJob(articleName, { progress: 0 }));
          } else {
            dispatch(loadingEnd());
            dispatch(alertError(json.message));
          }
        } else {
          dispatch(loadingEnd());
          dispatch(alertError("Failed to start job"));
        }
      };

      const url = SERVER_BASE_URL + JOB_PATH;
      const options = { 
        method: 'POST',
        body: JSON.stringify({ articleName: articleName }),
        headers: getHeaders()
      };

      return fetch(url, options)
        .then(response => response.json())
        .then(responseHandler)
        .catch(catchHandler);
    }
  };
}

const VisualizationContainer = connect(mapStateToProps, mapDispatchToProps)(VisualizationScreen);

export default VisualizationContainer;
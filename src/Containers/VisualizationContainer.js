import { connect } from "react-redux";

import VisualizationScreen from "../Components/Screens/VisualizationScreen";
import { saveArticleJob, saveArticleData } from "../Actions/ArticleData";
import { alertError } from "../Actions/Alert";
import { loadingStart, loadingReport, loadingEnd } from "../Actions/Loading";

const SERVER_BASE_URL = 'http://localhost:8080'
const JOB_PATH = '/job'

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

function getRawResponseHandler(dispatch) {
  return (response) => {
    if (!response.ok) {
      dispatch(loadingEnd());
      dispatch(alertError("Failed to make request"));
      return Promise.resolve(null);
    }

    return response.json();
  }
}

function mapStateToProps (state, ownProps) {
  const data = state.articleData[ownProps.match.params.id];
  return {
    data: data
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const catchHandler = getCatchHandler(dispatch);
  const rawResponseHandler = getRawResponseHandler(dispatch);

  return {
    getJobStatusToStore: (articleName) => {
      dispatch(loadingReport(ownProps.data.progress));

      const responseHandler = (json) => {
        if (json.status === 'complete') {
          dispatch(saveArticleData(json.data));
        } else if (json.status === 'failed') {
          dispatch(saveArticleJob(undefined));
          dispatch(loadingEnd());
          dispatch(alertError("Job failed mid-operation, check server logs"));
        } else {
          dispatch(saveArticleJob(json.data));
        }
      };
    
      const url = SERVER_BASE_URL + JOB_PATH;
      const options = { 
        method: 'GET',
        headers: getHeaders()
      };
    
      return fetch(url, options)
        .then(rawResponseHandler)
        .then(responseHandler)
        .catch(catchHandler);
    },
    getVisualizationDataToStore: (articleName) => {
      dispatch(loadingStart(true));

      const responseHandler = (json) => {
        if (json.status === 'success') {
          dispatch(saveArticleJob({ progress: 0 }));
        } else {
          dispatch(loadingEnd());
          dispatch(alertError("Failed to start job"));
        }
      };

      const url = SERVER_BASE_URL + JOB_PATH;
      const options = { 
        method: 'POST',
        headers: getHeaders()
      };

      return fetch(url, options)
        .then(rawResponseHandler)
        .then(responseHandler)
        .catch(catchHandler);
    }
  };
}

const VisualizationContainer = connect(mapStateToProps, mapDispatchToProps)(VisualizationScreen);

export default VisualizationContainer;
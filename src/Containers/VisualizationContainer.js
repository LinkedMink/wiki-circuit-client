import { connect } from "react-redux";
import urlJoin from "url-join";

import { getServiceActionUrl } from "../Shared/RequestFactory";
import VisualizationScreen from "../Components/Screens/VisualizationScreen";
import { saveArticleData } from "../Actions/Article";
import { alertError } from "../Actions/Alert";
import { loadingStart, loadingReport, loadingEnd } from "../Actions/Loading";
import { JobStatus, MessagePrefixes } from "../Constants/Message";
import { Service, Routes } from "../Constants/Service";

const JOB_CHECK_INTERVAL = process.env.REACT_APP_JOB_CHECK_INTERVAL
  ? Number(process.env.REACT_APP_JOB_CHECK_INTERVAL)
  : 2500;

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
  const article = state.article[ownProps.match.params.id];
  return {
    article: article
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const catchHandler = getCatchHandler(dispatch);

  return {
    getJobStatusToStore: (articleName, progress) => {
      dispatch(loadingStart(true));
      dispatch(loadingReport(Math.ceil(progress * 100)));

      const responseHandler = (json) => {
        if (!json) {
          return;
        }

        if (json.data.status === JobStatus.COMPLETE) {
          dispatch(saveArticleData(articleName, json.data));
          dispatch(loadingEnd());
        } else if (json.data.status === JobStatus.FAULTED) {
          dispatch(saveArticleData(articleName, json.data));
          dispatch(loadingEnd());
          dispatch(alertError("Job failed mid-operation, check server logs"));
        } else if (json.message.startsWith(MessagePrefixes.NO_JOB)) {
          dispatch(loadingEnd());
          dispatch(alertError("Job doesn't exist on the server"));
        } else {
          dispatch(saveArticleData(articleName, json.data));
        }
      };
    
      const url = urlJoin(
        getServiceActionUrl(Service.ARTICLE_JOB, Routes[Service.ARTICLE_JOB].ARTICLE), 
        articleName);
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
          dispatch(saveArticleData(articleName, { progress: { completed: 0 } }));
        } else if (json && json.message) {
          if (json.message.startsWith(MessagePrefixes.IN_CACHE) || 
              json.message.startsWith(MessagePrefixes.JOB_STARTED)) {
            dispatch(saveArticleData(articleName, { progress: { completed: 0 } }));
          } else {
            dispatch(loadingEnd());
            dispatch(alertError(json.message));
          }
        } else {
          dispatch(loadingEnd());
          dispatch(alertError("Failed to start job"));
        }
      };

      const url = getServiceActionUrl(Service.ARTICLE_JOB, Routes[Service.ARTICLE_JOB].ARTICLE);
      const options = { 
        method: 'POST',
        body: JSON.stringify({ id: articleName }),
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
import { connect } from "react-redux";
import urlJoin from "url-join";

import { getServiceActionUrl, getRequestOptions, HttpMethods } from "../Shared/RequestFactory";
import VisualizationScreen from "../Components/Screens/VisualizationScreen";
import { saveArticleData } from "../Actions/Article";
import { alertError } from "../Actions/Alert";
import { loadingStart, loadingReport, loadingEnd } from "../Actions/Loading";
import { JobStatus, MessagePrefixes } from "../Constants/Message";
import { Services, Routes, ResponseCodes } from "../Constants/Service";

const JOB_CHECK_INTERVAL = process.env.REACT_APP_JOB_CHECK_INTERVAL
  ? Number(process.env.REACT_APP_JOB_CHECK_INTERVAL)
  : 2500;

function delay(t, v) {
  return new Promise(function(resolve) { 
    setTimeout(resolve.bind(null, v), t)
  });
}

function mapStateToProps (state, ownProps) {
  const article = state.article[ownProps.match.params.id];
  return {
    article: article
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const catchHandler = (error) => {
    dispatch(loadingEnd());
    dispatch(alertError(error.message));
  };

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
        } else if (json.data.startsWith && json.data.startsWith(MessagePrefixes.NO_JOB)) {
          dispatch(loadingEnd());
          dispatch(alertError("Job doesn't exist on the server"));
        } else {
          dispatch(saveArticleData(articleName, json.data));
        }
      };
    
      const url = urlJoin(
        getServiceActionUrl(Services.ARTICLE_JOB, Routes[Services.ARTICLE_JOB].ARTICLE), 
        articleName);
      const options = getRequestOptions();

      return delay(JOB_CHECK_INTERVAL).then(() => {
        return fetch(url, options)
          .then(response => response.json())
          .then(responseHandler)
          .catch(catchHandler);
      });
    },
    getVisualizationDataToStore: (articleName) => {
      dispatch(loadingStart(true));

      const responseHandler = (json) => {
        if (json && json.status === ResponseCodes.SUCCESS) {
          return dispatch(saveArticleData(articleName, { progress: { completed: 0 } }));
        } else if (json && json.data && json.data.startsWith) {
          if (json.data.startsWith(MessagePrefixes.IN_CACHE) || json.data.startsWith(MessagePrefixes.JOB_STARTED)) {
            return dispatch(saveArticleData(articleName, { progress: { completed: 0 } }));
          }
          dispatch(loadingEnd());
          return dispatch(alertError(json.data));
        } else {
          dispatch(loadingEnd());
          return dispatch(alertError("Failed to start job"));
        }
      };

      const url = getServiceActionUrl(Services.ARTICLE_JOB, Routes[Services.ARTICLE_JOB].ARTICLE);
      const options = getRequestOptions(HttpMethods.POST, { id: articleName });

      return fetch(url, options)
        .then(response => response.json())
        .then(responseHandler)
        .catch(catchHandler);
    }
  };
}

const VisualizationContainer = connect(mapStateToProps, mapDispatchToProps)(VisualizationScreen);

export default VisualizationContainer;

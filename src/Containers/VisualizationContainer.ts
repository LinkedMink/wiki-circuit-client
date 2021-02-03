import {
  connect,
  MapDispatchToPropsFunction,
  MapStateToProps,
} from "react-redux";
import urlJoin from "url-join";

import {
  getServiceActionUrl,
  getRequestOptions,
  HttpMethods,
} from "../Shared/RequestFactory";
import VisualizationScreen from "../Components/Screens/VisualizationScreen";
import { saveArticleData } from "../Actions/ArticleAction";
import { alertError } from "../Actions/AlertAction";
import {
  loadingStart,
  loadingReport,
  loadingEnd,
} from "../Actions/LoadingAction";
import { JobStatus, MessagePrefixes } from "../Constants/Message";
import {
  Services,
  Routes,
  ResponseCode,
  ResponseData,
} from "../Constants/Service";
import { RootState } from "../Reducers/RootReducer";
import { Dispatch } from "redux";
import { RouteComponentIdProps } from "../Constants/RouteParams";
import { ArticleJob } from "../Constants/Scheduler";
import { isString } from "../Shared/TypeCheck";

const JOB_CHECK_INTERVAL = 2500;

function delay(t: number, ...v: unknown[]) {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null, v), t);
  });
}

const mapStateToProps: MapStateToProps<
  unknown,
  RouteComponentIdProps,
  RootState
> = (state: RootState, ownProps: RouteComponentIdProps) => {
  const article = state.article[ownProps.match.params.id];
  return { article };
};

const mapDispatchToProps: MapDispatchToPropsFunction<unknown, unknown> = (
  dispatch: Dispatch
) => {
  const catchHandler = (error) => {
    dispatch(loadingEnd());
    dispatch(alertError(error.message));
  };

  return {
    getJobStatusToStore: (articleName: string, progress: number) => {
      dispatch(loadingStart(true));
      dispatch(loadingReport(Math.ceil(progress * 100)));

      const responseHandler = (json: ResponseData<ArticleJob | string>) => {
        if (isString(json.data)) {
          if (json.data.startsWith(MessagePrefixes.NO_JOB)) {
            dispatch(loadingEnd());
            dispatch(alertError("Job doesn't exist on the server"));
          }
          return;
        }

        if (json.data.status === JobStatus.COMPLETE) {
          dispatch(saveArticleData(articleName, json.data));
          dispatch(loadingEnd());
        } else if (json.data.status === JobStatus.FAULTED) {
          dispatch(saveArticleData(articleName, json.data));
          dispatch(loadingEnd());
          dispatch(alertError("Job failed mid-operation, check server logs"));
        } else {
          dispatch(saveArticleData(articleName, json.data));
        }
      };

      const url = urlJoin(
        getServiceActionUrl(Services.ARTICLE, Routes[Services.ARTICLE].ARTICLE),
        articleName
      );
      const options = getRequestOptions();

      return delay(JOB_CHECK_INTERVAL).then(() => {
        return fetch(url, options)
          .then((response) => response.json())
          .then(responseHandler)
          .catch(catchHandler);
      });
    },
    getVisualizationDataToStore: (articleName: string) => {
      dispatch(loadingStart(true));

      const responseHandler = (json: ResponseData<ArticleJob | string>) => {
        if (isString(json.data)) {
          if (
            json.data.startsWith(MessagePrefixes.IN_CACHE) ||
            json.data.startsWith(MessagePrefixes.JOB_STARTED)
          ) {
            return dispatch(
              saveArticleData(articleName, { progress: { completed: 0 } })
            );
          }

          dispatch(loadingEnd());
          return dispatch(alertError(json.data));
        }

        if (json.status === ResponseCode.SUCCESS) {
          return dispatch(
            saveArticleData(articleName, { progress: { completed: 0 } })
          );
        } else {
          dispatch(loadingEnd());
          return dispatch(alertError("Failed to start job"));
        }
      };

      const url = getServiceActionUrl(
        Services.ARTICLE,
        Routes[Services.ARTICLE].ARTICLE
      );
      const options = getRequestOptions(HttpMethods.POST, { id: articleName });

      return fetch(url, options)
        .then((response) => response.json())
        .then(responseHandler)
        .catch(catchHandler);
    },
  };
};

const VisualizationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VisualizationScreen);

export default VisualizationContainer;

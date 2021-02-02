import queryString from "query-string";
import urlJoin from "url-join";

import store from "../Store";
import { alertError } from "../Actions/AlertAction";
import { loadingStart, loadingEnd } from "../Actions/LoadingAction";
import { LogService } from "./LogService";
import { ResponseCodes, Services } from "../Constants/Service";
import { Action, Dispatch } from "redux";
import { isAction } from "./TypeCheck";

const logger = LogService.get("RequestFactory");
const GENERIC_REQUEST_ERROR =
  "An error occurred while processing your request. If the problem persist, contact the administrator.";

export type ResponseHandler<
  TResponse = unknown,
  TAction extends Action = Action<unknown>
> = (data: TResponse) => TAction | void;

export const HttpMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const getRequestOptions = (
  method = HttpMethods.GET,
  requestData: Record<string, unknown> | unknown[] | null = null,
  isAuthorized = true
): RequestInit => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (isAuthorized) {
    const state = store.getState();
    if (state.account.jwtToken) {
      headers["Authorization"] = `Bearer ${state.account.jwtToken}`;
    }
  }

  const options = {
    method: method,
    headers: headers,
  } as RequestInit;

  if (requestData) {
    options.body = JSON.stringify(requestData);
  }

  return options;
};

const handleRawResponse = (dispatch, url, options) => {
  return response => {
    if (response.status === 500) {
      logger.error({
        url,
        verb: options.method,
        body: options.body,
        response: `${response.status}: ${response.body}`,
      });
      dispatch(alertError(GENERIC_REQUEST_ERROR));
      return Promise.resolve(null);
    }

    return response.json();
  };
};

const handleServiceResponse = <T>(
  dispatch: Dispatch,
  requestSuccessFunc: ResponseHandler<T>
) => {
  return json => {
    if (json && json.status === ResponseCodes.SUCCESS) {
      const result = requestSuccessFunc(json.data);
      if (isAction(result)) {
        dispatch(result);
      }
    } else if (
      json &&
      json.status !== undefined &&
      json.status !== ResponseCodes.SUCCESS
    ) {
      dispatch(alertError(json.data));
    } else if (json) {
      const result = requestSuccessFunc(json);
      if (isAction(result)) {
        dispatch(result);
      }
    }

    dispatch(loadingEnd());
  };
};

const handleGenericCatch = (dispatch, url, options) => {
  return error => {
    logger.error({
      url,
      verb: options.method,
      body: options.body,
      stack: error.stack,
    });
    dispatch(loadingEnd());
    dispatch(alertError(GENERIC_REQUEST_ERROR));
  };
};

export const getServiceActionUrl = (
  targetService: Services,
  path: string
): string => {
  const state = store.getState();

  if (state.config.urls && state.config.urls[targetService]) {
    return urlJoin(state.config.urls[targetService], path);
  } else {
    return path;
  }
};

export const getJsonResponse = <TResponse = unknown>(
  dispatch: Dispatch,
  targetService: Services,
  path: string,
  requestSuccessFunc: ResponseHandler<TResponse>,
  method = HttpMethods.GET,
  requestData: Record<string, unknown> | unknown[] | null = null,
  isAuthorized = true
): Promise<void> => {
  let url = getServiceActionUrl(targetService, path);

  if (requestData && method === HttpMethods.GET) {
    for (const [key, value] of Object.entries(requestData)) {
      if (value === "") {
        requestData[key] = undefined;
      }
    }

    const query = queryString.stringify(requestData);
    url += "?" + query;
  }

  const options = getRequestOptions(
    method,
    method === HttpMethods.GET ? null : requestData,
    isAuthorized
  );

  dispatch(loadingStart());

  return fetch(url, options)
    .then(handleRawResponse(dispatch, url, options))
    .then(handleServiceResponse(dispatch, requestSuccessFunc))
    .catch(handleGenericCatch(dispatch, url, options));
};

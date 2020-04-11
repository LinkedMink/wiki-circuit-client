import queryString from "query-string";
import urlJoin from "url-join";

import store from "../Store";
import { alertError } from "../Actions/Alert";
import { loadingStart, loadingEnd } from "../Actions/Loading";

const GENERIC_REQUEST_ERROR = "An error occurred while processing your request. If the problem persist, contact the administrator."

export const HttpMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
}

const getOptions = (method = HttpMethods.GET, requestData = null, isAuthorized = false) => {
  const headers = { 
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  
  if (isAuthorized) {
    const state = store.getState();
    if (state.account.token) {
      headers['Authorization'] = `Bearer ${state.account.token}`
    }
  }

  const options = {
    method: method,
    headers: headers,
  };

  if (requestData) {
    options.body = JSON.stringify(requestData)
  }

  return options
}

const handleRawResponse = (dispatch, url, options) => {
  return (response) => {
    if (response.status === 500) {
      console.error({
        url,
        verb: options.method, 
        body: options.body,
        response: `${response.status}: ${response.body}`,
      });
      dispatch(alertError(GENERIC_REQUEST_ERROR));
      return Promise.resolve(null);
    }

    return response.json();
  }
}

const handleServiceResponse = (dispatch, requestSuccessFunc) => {
  return (json) => {
    if (json && json.status === 0) {
      dispatch(requestSuccessFunc(json.data));
    } else if (json && json.status === 1) {
      dispatch(alertError(json.data));
    } else if (json) {
      dispatch(requestSuccessFunc(json));
    }

    dispatch(loadingEnd())
  }
}

const handleGenericCatch = (dispatch, url, options) => {
  return (error) => {
    console.error({ url, verb: options.method, body: options.body, stack: error.stack });
    dispatch(loadingEnd());
    dispatch(alertError(GENERIC_REQUEST_ERROR));
  }
}

export const getServiceActionUrl = (targetService, path) => {
  const state = store.getState();

  if (state.config.urls && state.config.urls[targetService]) {
    return urlJoin(state.config.urls[targetService], path);
  } else {
    return path;
  }
}

export const getJsonResponse = (
  dispatch, targetService, path, requestSuccessFunc, method = HttpMethods.GET, requestData = null, isAuthorized = false) => {
    
  let url = getServiceActionUrl(targetService, path);

  if (requestData && method === HttpMethods.GET) {
    for (const [key, value] of Object.entries(requestData)) {
      if (value === "") {
        requestData[key] = undefined;
      }
    }

    const query = queryString.stringify(requestData);
    url += '?' + query
  }

  const options = getOptions(method, method === HttpMethods.GET ? null : requestData, isAuthorized);

  dispatch(loadingStart())

  return fetch(url, options)
    .then(handleRawResponse(dispatch, url, options))
    .then(handleServiceResponse(dispatch, requestSuccessFunc))
    .catch(handleGenericCatch(dispatch, url, options));
}

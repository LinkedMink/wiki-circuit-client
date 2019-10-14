export const LOADING_START = 'LOADING_START';
export const LOADING_REPORT = 'LOADING_REPORT';
export const LOADING_END = 'LOADING_END';

export function loadingStart(isProgressable = false, message = "Loading... ") {
  return { 
    type: LOADING_START, 
    payload: {
      isProgressable: isProgressable,
      message: message
    }
  };
}

export function loadingReport(percentComplete) {
  return { 
    type: LOADING_REPORT, 
    payload: percentComplete
  };
}

export function loadingEnd() {
  return { 
    type: LOADING_END, 
    payload: null
  };
}

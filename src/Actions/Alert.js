export const ALERT_CLEAR = 'ALERT_CLEAR';
export const ALERT_ERROR = 'ALERT_ERROR';

export function alertClear() {
  return { 
    type: ALERT_CLEAR, 
    payload: null
  };
}

export function alertError(text) {
  return { 
    type: ALERT_ERROR, 
    payload: text
  };
}
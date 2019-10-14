import { ALERT_CLEAR, ALERT_ERROR } from '../Actions/Alert';

const AlertSeverity = {
  NONE: "None",
  ERROR: "Error",
}

function account(state = {}, action) {
  if (action.type === ALERT_CLEAR) {
    return Object.assign({}, state, { 
      severity: null, message: null
    });
  } else if (action.type === ALERT_ERROR) {
    return Object.assign({}, state, { 
      severity: AlertSeverity.ERROR, message: action.payload
    });
  } else {
    return state;
  }
}

export default account;
import { LOADING_START, LOADING_REPORT, LOADING_END } from '../Actions/Loading';

function loading(state = {}, action) {
  if (action.type === LOADING_START) {
    return Object.assign({}, state, { 
      isLoading: true, 
      percentComplete: action.payload.isProgressable ? 0 : null,
      message: action.payload.message
    });
  } 
  else if (action.type === LOADING_REPORT) {
    let copyState = Object.assign({}, state);
    copyState.percentComplete = action.payload;
    return copyState;
  } else if (action.type === LOADING_END) {
    return Object.assign({}, state, { 
      isLoading: false,
      percentComplete: null
    });
  } else {
    return state;
  }
}

export default loading;
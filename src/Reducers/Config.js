import { SAVE_CONFIG } from '../Actions/ConfigAction';

const config = (state = {}, action) => {
  if (action.type === SAVE_CONFIG) {
    const config = Object.assign({}, state, action.payload);
    return config;
  } else {
    return state;
  }
}

export default config;

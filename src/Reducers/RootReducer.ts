import { combineReducers } from "redux";

import account from "./AccountReducer";
import alert from "./AlertReducer";
import config from "./ConfigReducer";
import confirm from "./ConfirmReducer";
import loading from "./LoadingReducer";
import article from "./ArticleReducer";

const rootMap = {
  account,
  alert,
  config,
  confirm,
  loading,
  article,
};

const rootReducer = combineReducers(rootMap);

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

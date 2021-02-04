/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./Reducers/RootReducer";

const storeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, storeEnhancers(applyMiddleware(thunk)));

export default store;

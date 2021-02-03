import {
  connect,
  MapDispatchToPropsFunction,
  MapStateToProps,
} from "react-redux";
import { Dispatch } from "redux";

import App, { AppDispatchProps, AppStateProps } from "./App";
import { StorageKey } from "./Constants/Storage";
import { getJsonResponse } from "./Shared/RequestFactory";
import { saveConfig } from "./Actions/ConfigAction";
import { saveSession } from "./Actions/AccountAction";
import { Routes, Services } from "./Constants/Service";
import { RootState } from "./Reducers/RootReducer";

const mapStateToProps: MapStateToProps<AppStateProps, unknown, RootState> = (
  state: RootState
) => {
  return {
    isConfigLoaded: state.config.urls ? true : false,
    isLoggedIn: state.account.jwtToken ? true : false,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<
  AppDispatchProps,
  unknown
> = (dispatch: Dispatch) => {
  return {
    getConfig: () => {
      if (process.env.LOCAL_CONFIG) {
        const localConfig = JSON.parse(process.env.LOCAL_CONFIG);
        dispatch(saveConfig(localConfig));
        return;
      }

      const responseHandler = (data) => {
        return dispatch(saveConfig(data));
      };

      return getJsonResponse(
        dispatch,
        Services.SELF,
        Routes[Services.SELF].CONFIG,
        responseHandler
      );
    },
    getAccount: () => {
      const token = localStorage.getItem(StorageKey.JWT_TOKEN);
      if (token) {
        return dispatch(saveSession(token));
      }
    },
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;

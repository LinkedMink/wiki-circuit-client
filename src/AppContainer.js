import { connect } from "react-redux";

import App from "./App";
import { getJsonResponse } from "./Shared/RequestFactory";
import { saveConfig } from "./Actions/Config";
import { Routes, Service } from "./Constants/Service";

const mapStateToProps = (state) => {
  return {
    isConfigLoaded: state.config.urls ? true : false,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getConfig: () => {
      if (process.env.LOCAL_CONFIG) {
        const localConfig = JSON.parse(process.env.LOCAL_CONFIG);
        dispatch(saveConfig(localConfig));
        return;
      }
      
      let responseHandler = data => {
        return dispatch(saveConfig(data));
      }

      return getJsonResponse(
        dispatch, 
        Service.SELF,
        Routes[Service.SELF].CONFIG, 
        responseHandler);
    },
  };
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;

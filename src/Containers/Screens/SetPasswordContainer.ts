import { connect } from "react-redux";

import { Routes, Services } from "../../Constants/Service";
import { HttpMethods, getJsonResponse } from "../../Shared/RequestFactory";
import SetPasswordScreen from "../../Components/Screens/SetPasswordScreen";
import { alertRedirect } from "../../Actions/AlertAction";

const SUCCESS_MESSAGE = "Your password has been reset.";

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.account.token ? true : false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (email, resetToken, password) => {
      const requestData = {
        email,
        resetToken,
        password,
      };

      const responseHandler = () => {
        return dispatch(alertRedirect(SUCCESS_MESSAGE, "/login"));
      };

      return getJsonResponse(
        dispatch,
        Services.USER,
        Routes[Services.USER].PASSWORD,
        responseHandler,
        HttpMethods.PUT,
        requestData
      );
    },
  };
};

const SetPasswordContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SetPasswordScreen);

export default SetPasswordContainer;

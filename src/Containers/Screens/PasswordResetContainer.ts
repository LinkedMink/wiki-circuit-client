import { connect } from "react-redux";
import urlJoin from "url-join";

import { Routes, Services } from "../../Constants/Service";
import { getJsonResponse } from "../../Shared/RequestFactory";
import PasswordResetScreen from "../../Components/Screens/PasswordResetScreen";
import { alertRedirect } from "../../Actions/AlertAction";

const SUCCESS_MESSAGE = "A reset link has been sent. Check your email.";

const mapStateToProps = state => {
  return {
    isLoggedIn: state.account.token ? true : false,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getResetLink: email => {
      const responseHandler = () => {
        return dispatch(alertRedirect(SUCCESS_MESSAGE, "/login"));
      };

      return getJsonResponse(
        dispatch,
        Services.USER,
        urlJoin(Routes[Services.USER].PASSWORD, encodeURIComponent(email)),
        responseHandler
      );
    },
  };
};

const PasswordResetContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordResetScreen);

export default PasswordResetContainer;

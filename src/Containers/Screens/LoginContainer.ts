import { connect } from "react-redux";

import { StorageKey } from "../../Constants/Storage";
import { Routes, Services } from "../../Constants/Service";
import { HttpMethods, getJsonResponse } from "../../Shared/RequestFactory";
import LoginScreen from "../../Components/Screens/LoginScreen";
import { saveSession } from "../../Actions/AccountAction";
import { decodeToken } from "../../Shared/Token";
import { alertError } from "../../Actions/AlertAction";
import { Account } from "../../Constants/Message";

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.account.jwtToken ? true : false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password, rememberMe) => {
      const requestData = {
        email,
        password,
      };

      const responseHandler = (data) => {
        localStorage.removeItem(StorageKey.JWT_TOKEN);
        if (rememberMe) {
          localStorage.setItem(StorageKey.JWT_TOKEN, data.token);
        }

        const decoded = decodeToken(data.token);
        if (decoded === null) {
          return dispatch(alertError(Account.VERIFY_FAILED));
        }

        return dispatch(saveSession(data.token, decoded));
      };

      return getJsonResponse(
        dispatch,
        Services.USER,
        Routes[Services.USER].AUTHENTICATE,
        responseHandler,
        HttpMethods.POST,
        requestData
      );
    },
  };
};

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

export default LoginContainer;

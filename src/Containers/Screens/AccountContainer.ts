import { connect } from "react-redux";

import { Routes, Services } from "../../Constants/Service";
import { HttpMethods, getJsonResponse } from "../../Shared/RequestFactory";
import AccountScreen from "../../Components/Screens/AccountScreen";
import { saveAccount } from "../../Actions/AccountAction";
import { alertInfo, alertRedirect } from "../../Actions/AlertAction";
import {
  confirmClearKey,
  confirmOpenDialog,
} from "../../Actions/ConfirmAction";

const CONFIRM_DELETE_KEY = "AccountContainerDelete";
const CONFIRM_DELETE_MESSAGE =
  "Are you sure you want to delete your account? This cannot be undone.";
const UPDATE_SUCCESS = "Your account has been updated successfully.";
const EMAIL_VERIFICATION_NEEDED =
  "You will need to verify your email before the next login.";
const DELETE_SUCCESS = "Your account has been deleted successfully.";

const mapStateToProps = state => {
  return {
    profile: state.account.profile,
    deleteConfirmResult: state.confirm.inactive
      ? state.confirm.inactive[CONFIRM_DELETE_KEY]
      : undefined,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAccountData: () => {
      const responseHandler = data => {
        return dispatch(saveAccount(data));
      };

      return getJsonResponse(
        dispatch,
        Services.USER,
        Routes[Services.USER].ACCOUNT,
        responseHandler,
        HttpMethods.GET
      );
    },
    saveAccountData: properties => {
      const responseHandler = () => {
        let message = UPDATE_SUCCESS;
        if (properties.email) {
          message += ` ${EMAIL_VERIFICATION_NEEDED}`;
        }

        return dispatch(alertInfo(message));
      };

      return getJsonResponse(
        dispatch,
        Services.USER,
        Routes[Services.USER].ACCOUNT,
        responseHandler,
        HttpMethods.PUT,
        properties
      );
    },
    deleteAccountData: () => {
      dispatch(confirmClearKey(CONFIRM_DELETE_KEY));

      const responseHandler = () => {
        return dispatch(alertRedirect(DELETE_SUCCESS, "/logout"));
      };

      return getJsonResponse(
        dispatch,
        Services.USER,
        Routes[Services.USER].ACCOUNT,
        responseHandler,
        HttpMethods.DELETE
      );
    },
    deleteConfirm: () => {
      return dispatch(
        confirmOpenDialog(CONFIRM_DELETE_KEY, CONFIRM_DELETE_MESSAGE)
      );
    },
    deleteConfirmClear: () => dispatch(confirmClearKey(CONFIRM_DELETE_KEY)),
  };
};

const AccountContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountScreen);

export default AccountContainer;

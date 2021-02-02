import React from "react";
import { Redirect } from "react-router-dom";
import {
  connect,
  MapDispatchToPropsFunction,
  MapStateToProps,
} from "react-redux";
import { Dispatch } from "redux";

import { StorageKey } from "../Constants/Storage";
import { destroySession } from "../Actions/AccountAction";
import { RootState } from "../Reducers/RootReducer";

interface LogoutStateProps {
  isLoggedIn: boolean;
}

interface LogoutDispatchProps {
  logout: () => void;
}

type LogoutProps = LogoutStateProps & LogoutDispatchProps;

const mapStateToProps: MapStateToProps<LogoutStateProps, unknown, RootState> = (
  state: RootState
) => {
  return {
    isLoggedIn: state.account.jwtToken ? true : false,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<
  LogoutDispatchProps,
  unknown
> = (dispatch: Dispatch) => {
  return {
    logout: () => {
      localStorage.removeItem(StorageKey.JWT_TOKEN);
      dispatch(destroySession());
    },
  };
};

class Logout extends React.Component<LogoutProps> {
  render() {
    if (this.props.isLoggedIn && this.props.logout) {
      this.props.logout();
    }

    return <Redirect to="/" />;
  }
}

const LogoutContainer = connect(mapStateToProps, mapDispatchToProps)(Logout);

export default LogoutContainer;

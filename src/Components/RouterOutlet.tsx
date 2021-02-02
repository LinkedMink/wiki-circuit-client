import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import { Claim } from "../Constants/Account";
import RouteAuthContainer from "../Containers/RouteAuthContainer";
import LoginContainer from "../Containers/Screens/LoginContainer";
import LogoutContainer from "../Containers/LogoutContainer";
import PasswordResetContainer from "../Containers/Screens/PasswordResetContainer";
import SetPasswordContainer from "../Containers/Screens/SetPasswordContainer";
import RegisterContainer from "../Containers/Screens/RegisterContainer";
import AboutScreen from "./Screens/AboutScreen";
import UnauthorizedScreen from "./Screens/UnauthorizedScreen";
import HomeScreen from "./Screens/HomeScreen";

export interface RouterOutletProps {
  defaultRedirect: string;
}

class RouterOutlet extends React.Component<RouterOutletProps> {
  getDefaultRedirect = (): string => {
    return this.props.defaultRedirect ? this.props.defaultRedirect : "/login";
  };

  render = (): React.ReactNode => (
    <Switch>
      <Route exact path="/login" component={LoginContainer} />
      <Route exact path="/logout" component={LogoutContainer} />
      <Route exact path="/register" component={RegisterContainer} />
      <Route exact path="/password-reset" component={PasswordResetContainer} />
      <Route
        exact
        path="/set-password/:email/:token"
        component={SetPasswordContainer}
      />
      <Route exact path="/about" component={AboutScreen} />
      <Route
        exact
        path="/unauthorized/:claims"
        component={UnauthorizedScreen}
      />
      <RouteAuthContainer
        requiredClaim={Claim.TASK_SCHEDULE}
        exact={true}
        path="/home"
        component={HomeScreen}
      />
      <Redirect from="/" to={this.getDefaultRedirect()} />
    </Switch>
  );
}

export default RouterOutlet;

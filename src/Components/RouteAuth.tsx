import React from "react";
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom";
import { Claim } from "../Constants/Account";

export interface RouteAuthProps extends RouteProps {
  isLoggedIn?: boolean;
  requiredClaim?: Claim;
  claims?: Set<Claim>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: any;
}

class RouteAuth extends React.Component<RouteAuthProps> {
  constructor(props: RouteAuthProps) {
    super(props);

    this.renderComponentRedirect = this.renderComponentRedirect.bind(this);
  }

  getNoComponentProps(props: RouteAuthProps): Partial<RouteAuthProps> {
    const { component: Component, ...rest } = props;
    return rest;
  }

  hasRequiredClaim(): boolean {
    return (
      !this.props.requiredClaim ||
      !this.props.claims ||
      this.props.claims.has(this.props.requiredClaim)
    );
  }

  renderComponentRedirect(props: RouteComponentProps): JSX.Element {
    if (!this.props.isLoggedIn) {
      return (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      );
    } else if (this.hasRequiredClaim()) {
      return <this.props.component {...props} />;
    } else {
      return (
        <Redirect
          to={{
            pathname: `/unauthorized/${this.props.requiredClaim}`,
            state: { from: props.location },
          }}
        />
      );
    }
  }

  render(): React.ReactNode {
    return (
      <Route
        {...this.getNoComponentProps(this.props)}
        render={this.renderComponentRedirect}
      />
    );
  }
}

export default RouteAuth;

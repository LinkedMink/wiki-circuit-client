import * as React from "react";
import { Row } from "react-bootstrap";
import { RouteComponentClaimsProps } from "../../Constants/RouteParams";

class UnauthorizedScreen extends React.Component<RouteComponentClaimsProps> {
  render(): React.ReactNode {
    return (
      <div className="screen-container">
        <h2>Unauthorized</h2>
        <p>
          The requested page requires a user claim:{" "}
          {this.props.match.params.claims}
        </p>
        <p>
          Contact the administrator if you should have permission to use this
          feature.
        </p>
      </div>
    );
  }
}

export default UnauthorizedScreen;

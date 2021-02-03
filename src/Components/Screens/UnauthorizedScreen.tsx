import * as React from "react";
import { Row } from "react-bootstrap";
import { RouteComponentClaimsProps } from "../../Constants/RouteParams";

const styles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
});

class UnauthorizedScreen extends React.Component<RouteComponentClaimsProps> {
  render(): React.ReactNode {
    return (
      <div className="screen-container">
        <Row className="header-block">
          <h2>Unauthorized</h2>
        </Row>
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

import * as React from "react";
import { Row, Col } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";

import ArticleNameSubmit from "../Controls/ArticleNameSubmit";

import "./HomeScreen.scss";

class HomeScreen extends React.Component<RouteComponentProps> {
  render(): React.ReactNode {
    return (
      <div className="home-container">
        <Row className="justify-content-md-center">
          <Col className="home-submit" xs="11" sm="10" md="9" lg="8" xl="6">
            <div>
              <h2>Analyze Article</h2>
            </div>
            <ArticleNameSubmit {...this.props} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default HomeScreen;

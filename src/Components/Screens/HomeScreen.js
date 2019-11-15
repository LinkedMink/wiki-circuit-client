import React from 'react';
import { Row, Col } from 'react-bootstrap';

import ArticleNameSubmit from '../Controls/ArticleNameSubmit';

import './HomeScreen.scss';

class HomeScreen extends React.Component {
  render() {
    return (
      <div className="home-container">
        <Row className="justify-content-md-center">
          <Col className="home-submit" 
               xs="10" sm="8" md="6">
            <div>
              <h2>Analyze Article</h2>
            </div>
            <ArticleNameSubmit history={this.props.history} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default HomeScreen;
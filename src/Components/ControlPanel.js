import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './ControlPanel.scss';

class ControlPanel extends React.Component {
  render = () => {
    return (
      <Col className="control-panel">
        <Row>
          <h4>Controls</h4>
        </Row>
        <div>
          {this.props.children}
        </div>
      </Col>
    );
  }
}

export default ControlPanel;
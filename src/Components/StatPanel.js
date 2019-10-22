import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './StatPanel.scss';

class StatPanel extends React.Component {
  renderStats = () => {
    const output = [];

    if (this.props.data) {
      for (const entry of this.props.data.entries()) {
        output.push(<p key={entry[0]}>{entry[0]}: {entry[1]}</p>);
      }
    }

    return output;
  }

  render = () => {
    return (
      <Col className="stats-panel">
        <Row>
          <h4>Stats and Info</h4>
        </Row>
        <div>
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionAppear={true}
            transitionAppearTimeout={300}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}>
            {this.renderStats()}
          </ReactCSSTransitionGroup>
        </div>
      </Col>
    );
  }
}

export default StatPanel;
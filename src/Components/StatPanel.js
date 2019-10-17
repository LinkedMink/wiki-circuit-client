import React from 'react';
import { Row, Col } from 'react-bootstrap';

import './StatPanel.scss';

class StatPanel extends React.Component {
  renderStats() {
    const output = [];

    if (this.props.data) {
      for (const entry of this.props.data.entries()) {
        output.push(<p key={entry[0]}>{entry[0]}: {entry[1]}</p>);
      }
    }

    return output;
  }

  render() {
    return (
      <Col className="stats-panel">
        <Row>
          <h4>Stats and Info</h4>
        </Row>
        <div>
          {this.renderStats()}
        </div>
      </Col>
    );
  }
}

export default StatPanel;
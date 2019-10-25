import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './StatPanel.scss';

class StatPanel extends React.Component {
  getListFromMap = (map) => {
    const output = [];

    for (const entry of map) {
      if (entry[1].entries) {
        const subList = this.getListFromMap(entry[1]);
        output.push(<li key={entry[0]}>{entry[0]}: {subList}</li>);
      } else {
        output.push(<li key={entry[0]}>{entry[0]}: {entry[1]}</li>);
      }
    }

    return output;
  }

  renderStats = () => {
    if (this.props.data) {
      return this.getListFromMap(this.props.data);
    }

    return [];
  }

  render = () => {
    return (
      <Col className="stats-panel">
        <Row>
          <h4>{this.props.label ? this.props.label : 'Stats and Info'}</h4>
        </Row>
        <div>
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionAppear={true}
            transitionAppearTimeout={300}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}>
            <ul>
              {this.renderStats()}
            </ul>
          </ReactCSSTransitionGroup>
        </div>
      </Col>
    );
  }
}

export default StatPanel;
import React from "react";
import { Row, Col } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import { isMap } from "../Shared/TypeCheck";

import "./StatPanel.scss";

export interface StatPanelProps {
  label: string;
  data: Map<string, string | unknown>;
}

class StatPanel extends React.Component<StatPanelProps> {
  getListFromMap = (map: Map<string, string | unknown>): JSX.Element[] => {
    const output: JSX.Element[] = [];

    for (const entry of map) {
      if (isMap<string, unknown>(entry[1])) {
        const subList = this.getListFromMap(entry[1]);
        output.push(
          <li key={entry[0]}>
            {entry[0]}: {subList}
          </li>
        );
      } else {
        output.push(
          <li key={entry[0]}>
            {entry[0]}: {entry[1]}
          </li>
        );
      }
    }

    return output;
  };

  renderStats = (): JSX.Element[] => {
    if (this.props.data) {
      return this.getListFromMap(this.props.data);
    }

    return [];
  };

  render = (): React.ReactNode => {
    return (
      <Col className="stats-panel">
        <Row>
          <h4>{this.props.label ? this.props.label : "Stats and Info"}</h4>
        </Row>
        <div>
          <CSSTransition in={!!this.props.data} timeout={300} classNames="fade">
            <ul>{this.renderStats()}</ul>
          </CSSTransition>
        </div>
      </Col>
    );
  };
}

export default StatPanel;

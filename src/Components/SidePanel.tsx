import React from "react";
import { Row, Col } from "react-bootstrap";

import "./SidePanel.scss";

export interface SidePanelProps {
  label: string;
  children: JSX.Element[];
}

class SidePanel extends React.Component<SidePanelProps> {
  render = (): React.ReactNode => {
    return (
      <Col className="side-panel">
        <Row>
          <h4>{this.props.label}</h4>
        </Row>
        <div>{this.props.children}</div>
      </Col>
    );
  };
}

export default SidePanel;

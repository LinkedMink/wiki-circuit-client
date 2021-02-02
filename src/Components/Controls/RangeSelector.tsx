import React from "react";
import { Row, Col, Form } from "react-bootstrap";

import "./RangeSelector.scss";

let controlIdIncrement = 0;

export interface RangeSelectorState {
  controlId: string;
  selectedValue: string;
}

export interface RangeSelectorProps {
  min: number;
  max: number;
  step: number;
  label: string;
  tooltip: string;
  onValueChange: (selected: string) => void;
}

class RangeSelector extends React.Component<
  RangeSelectorProps,
  RangeSelectorState
> {
  constructor(props: RangeSelectorProps) {
    super(props);

    this.state = {
      controlId: `rangeSelector${controlIdIncrement}`,
      selectedValue: Math.floor((props.max + props.min) / 2).toString(),
    };

    controlIdIncrement++;
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ selectedValue: event.target.value });
    if (this.props.onValueChange) {
      this.props.onValueChange(event.target.value);
    }
  };

  render = (): React.ReactNode => {
    return (
      <Form.Group className="range-selector" controlId={this.state.controlId}>
        <Form.Label title={this.props.tooltip}>{this.props.label}</Form.Label>
        <Row>
          <Col xs="12">
            <Form.Control
              type="range"
              min={this.props.min}
              max={this.props.max}
              step={this.props.step ? this.props.step : 1}
              value={this.state.selectedValue}
              title={this.state.selectedValue}
              onChange={this.handleChange}
              required
            />
          </Col>
        </Row>
        <Row>
          <Col xs="6" className="text-left">
            {this.props.min}
          </Col>
          <Col xs="6" className="text-right">
            {this.props.max}
          </Col>
        </Row>
      </Form.Group>
    );
  };
}

export default RangeSelector;

import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

import './RangeSelector.scss';

let controlIdIncrement = 0;

class RangeSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      controlId: `rangeSelector${controlIdIncrement}`,
      selectedValue: Math.floor((props.max + props.min) / 2)
    };

    controlIdIncrement++;
  }

  handleChange = (event) => {
    this.setState({selectedValue: event.target.value});
    if (this.props.onValueChange) {
      this.props.onValueChange(event.target.value);
    }
  }
    
  render = () => {
    return (
      <Form.Group className="range-selector" controlId={this.state.controlId}>
        <Form.Label title={this.props.tooltip}>
          {this.props.label}
        </Form.Label>
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
                required />
          </Col>
        </Row>
        <Row>
          <Col xs="6" className="text-left">{this.props.min}</Col>
          <Col xs="6" className="text-right">{this.props.max}</Col>
        </Row>
      </Form.Group>
    )
  }
}

export default RangeSelector;
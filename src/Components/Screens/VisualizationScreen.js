import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

import ChordPanel from '../ChordPanel';

import './VisualizationScreen.scss';

class VisualizationScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      depth: 1
    };

    this.handleChange  = this.handleChange.bind(this);
  }

  getVisualizationData() {
    if (!this.props.article) {
      if (!this.props.job) {
        if (this.props.getVisualizationDataToStore) {
          this.props.getVisualizationDataToStore(this.props.match.params.id)
        }
  
        return {};
      }

      if (this.props.getJobStatusToStore) {
        this.props.getJobStatusToStore(
          this.props.match.params.id, 
          this.props.job.progress);
      }

      return {};
    }

    return this.props.article;
  }

  getReadableId() {
    return this.props.match.params.id.replace('_', ' ');
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  render() {
    return (
      <div>
        <h2>Article: {this.getReadableId()}</h2>
        <div>
          
        </div>
        <Form>
          <Form.Group controlId="depth">
            <Form.Label>
              Depth
            </Form.Label>
            <Row>
              <Col xs="12" sm="8" md="6">
                <Form.Control type="range" 
                              min="1"
                              max="3"
                              step="1"
                              value={this.state.depth} 
                              onChange={this.handleChange} 
                              required />
              </Col>
            </Row>
            <Row>
              <Col xs="4" sm="3" md="2" className="text-left">1</Col>
              <Col xs="4" sm="3" md="2" className="text-center">2</Col>
              <Col xs="4" sm="3" md="2" className="text-right">3</Col>
            </Row>
          </Form.Group>
        </Form>
        <ChordPanel data={this.getVisualizationData()} className="panel-border" />
      </div>
    );
  }
}

export default VisualizationScreen;
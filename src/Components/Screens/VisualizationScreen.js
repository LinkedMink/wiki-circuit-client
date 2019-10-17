import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

import ChordPanel from '../ChordPanel';
import StatPanel from '../StatPanel';

import './VisualizationScreen.scss';

class VisualizationScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      depth: 1,
      segmentCount: 30,
      selected: undefined
    };

    this.handleChange  = this.handleChange.bind(this);
  }

  getVisualizationData() {
    if (!this.props.article) {
      if (!this.props.job) {
        if (this.props.getVisualizationDataToStore) {
          this.props.getVisualizationDataToStore(this.props.match.params.id)
        }
  
        return [];
      }

      if (this.props.getJobStatusToStore) {
        this.props.getJobStatusToStore(
          this.props.match.params.id, 
          this.props.job.progress);
      }

      return [];
    }

    return this.props.article;
  }

  getReadableId(id) {
    return id.replace(/_/g, ' ');
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  getStatData() {
    const parts = new Map();

    if (this.state.selected) {
      parts.set('Article ID', this.getReadableId(this.state.selected.id));
      parts.set('Referenced', this.state.selected.referenceCount);
      
      let uniqueLinks = 0
      let totalLinks = 0
      for (const [key, value] of Object.entries(this.state.selected.linkedArticles)) {
        totalLinks += value;
        uniqueLinks++;
      }

      parts.set('Unique Links', uniqueLinks);
      parts.set('Total Links', totalLinks);

      return parts;
    }

    if (this.props.job) {
      if (this.props.job.startTime) {
        const start = new Date(this.props.job.startTime);
        parts.set('Retrieved At', start.toLocaleTimeString('en-US'));
      }

      if (this.props.job.runTime) {
        parts.set('Finished In', `${(this.props.job.runTime / 1000).toFixed(1)} s`);
      }

      if (this.props.job.totals && this.props.job.totals[0]) {
        parts.set('Links Found', this.props.job.totals[0].links);
      }

      if (this.props.job.totals && this.props.job.totals[0]) {
        parts.set('Downloaded Articles', this.props.job.totals[0].downloaded);
      }
    }

    if (this.props.article) {
      parts.set('Unique Articles', this.props.article.length);
    }

    return parts;
  }

  getMinSegmentCount() {

  }

  getMaxSegmentCount() {

  }

  onPartSelect = (part) => {
    this.setState({selected: part});
  }

  render() {
    return (
      <div>
        <h2>Article: {this.getReadableId(this.props.match.params.id)}</h2>
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
              <Col xs="4" sm="3" md="2" className="text-center"></Col>
              <Col xs="4" sm="3" md="2" className="text-right">3</Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="segmentCount">
            <Form.Label>
              Segments
            </Form.Label>
            <Row>
              <Col xs="12" sm="8" md="6">
                <Form.Control type="range" 
                              min="20"
                              max="40"
                              step="1"
                              value={this.state.segmentCount} 
                              onChange={this.handleChange} 
                              required />
              </Col>
            </Row>
            <Row>
              <Col xs="4" sm="3" md="2" className="text-left">20</Col>
              <Col xs="4" sm="3" md="2" className="text-center"></Col>
              <Col xs="4" sm="3" md="2" className="text-right">40</Col>
            </Row>
          </Form.Group>
        </Form>
        <Row className="chord-panel">
          <Col xs="12" sm="8">
            <ChordPanel data={this.getVisualizationData()} onPartSelect={this.onPartSelect} />
          </Col>
          <Col xs="12" sm="4">
            <StatPanel data={this.getStatData()} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default VisualizationScreen;
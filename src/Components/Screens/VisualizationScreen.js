import React from 'react';
import { Row, Col } from 'react-bootstrap';

import ArticleNameSubmit from '../Controls/ArticleNameSubmit';
import RangeSelector from '../Controls/RangeSelector';
import ChordPanel from '../ChordPanel';
import SidePanel from '../SidePanel';
import StatPanel from '../StatPanel';

import './VisualizationScreen.scss';

const MIN_SEGMENTS_SELECTABLE = 10;
const MAX_SEGMENTS_SELECTABLE = 50;

class VisualizationScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      depth: 1,
      segmentCount: 30,
      selected: undefined,
      visibleLinks: undefined
    };
  }

  getVisualizationData = () => {
    if (!this.props.article) {
      if (this.props.getVisualizationDataToStore) {
        this.props.getVisualizationDataToStore(this.props.match.params.id);
      }

      return [];
    }

    if (!this.props.article.result) {
      if (this.props.article.status === 'faulted') {
        return [];
      }

      if (this.props.getJobStatusToStore) {
        this.props.getJobStatusToStore(
          this.props.match.params.id, 
          this.props.article.progress.completed);
      }

      return [];
    }

    return this.props.article.result;
  }

  getReadableId = (id) => {
    return decodeURIComponent(id.replace(/_/g, ' '));
  }

  getStatData = () => {
    const parts = new Map();

    if (this.state.selected) {
      parts.set('Article ID', this.getReadableId(this.state.selected.id));
      parts.set('Referenced', this.state.selected.referenceCount);
      
      let uniqueLinks = 0;
      let totalLinks = 0;
      for (const [, value] of Object.entries(this.state.selected.linkedArticles)) {
        totalLinks += value;
        uniqueLinks++;
      }

      parts.set('Unique Links', uniqueLinks);
      parts.set('Total Links', totalLinks);

      return parts;
    }

    if (this.props.article) {
      if (this.props.article.startTime) {
        const start = new Date(this.props.article.startTime);
        parts.set('Retrieved At', start.toLocaleTimeString('en-US'));
      }

      if (this.props.article.runTime) {
        parts.set('Finished In', `${(this.props.article.runTime / 1000).toFixed(1)} s`);
      }

      const totals = this.props.article.progress.data;
      if (totals && totals['0']) {
        const allTotals = totals['0'];
        parts.set('Links Found', allTotals.links);
        parts.set('Unique Articles', allTotals.queued);
        parts.set('Downloaded Articles', allTotals.downloaded);
      }
    }

    return parts;
  }

  getVisibleLinks = () => {
    const parts = new Map();

    if (this.state.visibleLinks) {
      for (const [index, value] of Object.entries(this.state.visibleLinks)) {
        parts.set(this.getReadableId(index), value);
      }
    }

    return parts;
  }

  getMinSegmentCount = () => {
    if (this.props.article && this.props.article.result && 
        this.props.article.result.length < MIN_SEGMENTS_SELECTABLE) {
      return this.props.article.result.length;
    }

    return MIN_SEGMENTS_SELECTABLE;
  }

  getMaxSegmentCount = () => {
    if (this.props.article && this.props.article.result && 
        this.props.article.result.length < MAX_SEGMENTS_SELECTABLE) {
      return this.props.article.result.length;
    }

    return MAX_SEGMENTS_SELECTABLE;
  }

  onPartSelect = (part, visibleLinks) => {
    this.setState({selected: part});
    this.setState({visibleLinks: visibleLinks});
  }

  onSegmentCountChange = (value) => {
    this.setState({segmentCount: value});
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.props.history) {
      const encoded = encodeURIComponent(this.state.articleName.replace(' ', '_'));
      const route = `/visualization/${encoded}`;
      this.props.history.push(route);
    }
  }

  render = () => {
    return (
      <div className='screen-container'>
        <Row className="header-panel header-block">
          <Col xs="12" md="8">
            <h2>Article: {this.getReadableId(this.props.match.params.id)}</h2>
          </Col>
          <Col xs="12" md="4">
            <ArticleNameSubmit buttonVariant="primary" history={this.props.history} />
          </Col>
        </Row>
        
        <Row className="chord-panel">
          <Col xs="12" sm="8">
            <ChordPanel 
              data={this.getVisualizationData()}
              segmentCount={this.state.segmentCount} 
              onPartSelect={this.onPartSelect} />
          </Col>
          <Col className="info-panel" xs="12" sm="4">
            <SidePanel label="Controls">
              <RangeSelector 
                label="Segments"
                tooltip="Number of article blocks to show"
                min={this.getMinSegmentCount()} 
                max={this.getMaxSegmentCount()}
                onValueChange={this.onSegmentCountChange} />
            </SidePanel>
            <StatPanel data={this.getStatData()} />
            <StatPanel data={this.getVisibleLinks()} label="Visible Links" />
          </Col>
        </Row>
      </div>
    );
  }
}

export default VisualizationScreen;
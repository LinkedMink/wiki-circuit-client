import React from 'react';

import ChordSegment from './ChordSegment';
import { ratioToRadians } from '../Helpers/Math';

import './ChordPanel.scss';

const DEFAULT_SEGMENT_COUNT = 30;

class ChordPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: undefined
    };
  }

  isSegmentSelected = (id) => {
    return (this.state.selected === id)
  }

  getOutlineClass = () => {
    if (this.state.selected === undefined) {
      return 'outline';
    } else {
      return '';
    }
  }

  onSegmentSelect = (segment, id) => {
    if (this.props.onPartSelect) {
      const visibleLinks = {};
      const articles = this.segmentMap.get(id).segment.linkedArticles;
      Object.keys(articles).forEach((article) => {
        if (this.segmentMap.has(article)) {
          visibleLinks[article] = articles[article];
        }
      })

      this.props.onPartSelect(segment, visibleLinks);
    }

    this.setState({selected: id});
  }

  handleRimClick = () => {
    if (this.props.onPartSelect) {
      this.props.onPartSelect();
    }

    this.setState({selected: undefined});
  }

  renderSegment = (index, id, segmentMap) => {
    return <ChordSegment 
             key={index + 1} id={id} data={segmentMap} 
             isSelected={this.isSegmentSelected(id)}
             onSegmentSelect={this.onSegmentSelect} />;
  }

  renderSegments = () => {
    if (!this.props.data) {
      return;
    }

    const segmentCount = this.props.segmentCount ? this.props.segmentCount : DEFAULT_SEGMENT_COUNT;
    this.segmentData = this.props.data.slice(0, segmentCount);

    let referencesTotal = 0;
    this.segmentData.forEach((element) => {
      referencesTotal += element.referenceCount;
    });

    let referencesToSegment = 0;
    this.segmentMap = new Map();
    this.segmentData.forEach((segment, index) => {
      this.segmentMap.set(segment.id, {
        segment: segment,
        index: index,
        startAngle: ratioToRadians(referencesToSegment / referencesTotal),
        arcLength: ratioToRadians(segment.referenceCount / referencesTotal)
      });

      referencesToSegment += segment.referenceCount;
    });

    return this.segmentData.map((segment, index) => this.renderSegment(index, segment.id, this.segmentMap));
  }

  render = () => {
    return (
      <svg className="chord-diagram" viewBox="0 0 1000 1000">
        <circle cx="50%" cy="50%" r="495" className={this.getOutlineClass()} />
        <circle cx="50%" cy="50%" r="477" className={this.getOutlineClass()} />
        <circle cx="50%" cy="50%" r="486" 
                className="outer-rim" onClick={this.handleRimClick} />
        {this.renderSegments()}
      </svg>
    );
  }
}

export default ChordPanel;
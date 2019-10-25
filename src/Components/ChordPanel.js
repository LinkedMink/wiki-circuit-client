import React from 'react';

import ChordSegment from './ChordSegment';
import { ratioToRadians } from '../Helpers/Math';

import './ChordPanel.scss';

const DEFAULT_SEGMENT_COUNT = 30;

class ChordPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: undefined,
      segmentMap: null
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
      this.props.onPartSelect(segment);
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
    const segmentData = this.props.data.slice(0, segmentCount);

    let referencesTotal = 0;
    segmentData.forEach((element) => {
      referencesTotal += element.referenceCount;
    });

    let referencesToSegment = 0;
    const segmentMap = new Map();
    segmentData.forEach((segment, index) => {
      segmentMap.set(segment.id, {
        segment: segment,
        index: index,
        startAngle: ratioToRadians(referencesToSegment / referencesTotal),
        arcLength: ratioToRadians(segment.referenceCount / referencesTotal)
      });

      referencesToSegment += segment.referenceCount;
    });

    return segmentData.map((segment, index) => this.renderSegment(index, segment.id, segmentMap));
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
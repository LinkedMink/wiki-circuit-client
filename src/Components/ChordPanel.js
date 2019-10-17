import React from 'react';

import ChordSegment from './ChordSegment';

import './ChordPanel.scss';

const MAX_NUMBER_OF_SEGMENTS = 31;

class ChordPanel extends React.Component {
  renderSegment = (index, segments) => {
    return <ChordSegment 
             key={index} index={index} data={segments} 
             onSegmentSelect={this.onSegmentSelect} />;
  }

  renderSegments = () => {
    if (!this.props.data) {
      return;
    }

    const segmentData = this.props.data.slice(0, MAX_NUMBER_OF_SEGMENTS);
    return segmentData.map((segment, index) => this.renderSegment(index, segmentData));
  }

  onSegmentSelect = (segment) => {
    if (this.props.onPartSelect) {
      this.props.onPartSelect(segment);
    }
  }

  handleRimClick = () => {
    if (this.props.onPartSelect) {
      this.props.onPartSelect();
    }
  }

  render() {
    return (
      <svg className="chord-diagram" viewBox="0 0 1000 1000">
        <circle cx="50%" cy="50%" r="499" />
        <circle cx="50%" cy="50%" r="481" />
        <circle cx="50%" cy="50%" r="490" 
                className="outer-rim" onClick={this.handleRimClick} />
        {this.renderSegments()}
      </svg>
    );
  }
}

export default ChordPanel;
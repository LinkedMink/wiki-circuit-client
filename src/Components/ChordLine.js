import React from 'react';

import { polarToCartesian } from '../Helpers/Math';

import './ChordLine.scss';

const STROKE_WIDTH_MULTIPLER = 1;
const HALF_VIEWPORT = 500;
const RADIUS = 431;

class ChordLine extends React.Component {
  getPath = () => {
    if (!this.props.segmentMap || !this.props.segmentId || !this.props.targetId) {
      return '';
    }

    const source = this.props.segmentMap.get(this.props.segmentId);
    const target = this.props.segmentMap.get(this.props.targetId);

    // Already applying a rotation from ChordSegement, find the diff between the two segments
    const sourceAngle = source.arcLength / 2;
    const targetAngle = target.startAngle - source.startAngle + (target.arcLength / 2);
    const sourceXY = polarToCartesian(HALF_VIEWPORT, HALF_VIEWPORT, RADIUS, sourceAngle);
    const targetXY = polarToCartesian(HALF_VIEWPORT, HALF_VIEWPORT, RADIUS, targetAngle);

    return `M ${sourceXY.x} ${sourceXY.y} Q ${HALF_VIEWPORT} ${HALF_VIEWPORT}, ${targetXY.x} ${targetXY.y}`;
  }

  getStrokeWidth = () => {
    if (!this.props.segmentMap || !this.props.segmentId || !this.props.targetId) {
      return STROKE_WIDTH_MULTIPLER;
    }

    const segment = this.props.segmentMap.get(this.props.segmentId).segment;
    const referenceCount = segment.linkedArticles[this.props.targetId];
    return referenceCount * STROKE_WIDTH_MULTIPLER;
  }

  getColor = () => {
    if (this.props.isSelected) {
      return '#d6f016';
    }

    return this.props.color;
  }

  render = () => {
    return (
      <g className="chord-line">
        <path 
          d={this.getPath()} 
          stroke={this.getColor()} 
          strokeWidth={this.getStrokeWidth()} />
      </g>
    );
  }
}

export default ChordLine;
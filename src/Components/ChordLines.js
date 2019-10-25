import React from 'react';

import { polarToCartesian } from '../Helpers/Math';

import './ChordLines.scss';

const STROKE_WIDTH_MULTIPLER = 1;
const HALF_VIEWPORT = 500;
const RADIUS = 431;

class ChordLines extends React.Component {
  getPath = (targetId) => {
    if (!this.props.segmentMap || !this.props.segmentId) {
      return '';
    }

    const source = this.props.segmentMap.get(this.props.segmentId);
    const target = this.props.segmentMap.get(targetId);

    // Already applying a rotation from ChordSegement, find the diff between the two segments
    const sourceAngle = source.arcLength / 2;
    const targetAngle = target.startAngle - source.startAngle + (target.arcLength / 2);
    const sourceXY = polarToCartesian(HALF_VIEWPORT, HALF_VIEWPORT, RADIUS, sourceAngle);
    const targetXY = polarToCartesian(HALF_VIEWPORT, HALF_VIEWPORT, RADIUS, targetAngle);

    return `M ${sourceXY.x} ${sourceXY.y} Q ${HALF_VIEWPORT} ${HALF_VIEWPORT}, ${targetXY.x} ${targetXY.y}`;
  }

  getStrokeWidth = (targetId) => {
    if (!this.props.segmentMap || !this.props.segmentId) {
      return STROKE_WIDTH_MULTIPLER;
    }

    const segment = this.props.segmentMap.get(this.props.segmentId).segment;
    const referenceCount = segment.linkedArticles[targetId];
    return referenceCount * STROKE_WIDTH_MULTIPLER;
  }

  getColor = () => {
    if (this.props.isSelected) {
      return '#d6f016';
    }

    return this.props.color;
  }

  renderPath = (targetId) => {
    return (<path 
      d={this.getPath(targetId)} 
      stroke={this.getColor()} 
      strokeWidth={this.getStrokeWidth(targetId)} />);
  }

  renderPaths = () => {
    if (!this.props.targetIds) {
      return [];
    }
    
    return this.props.targetIds.map((targetId) => {
      return this.renderPath(targetId);
    });
  }

  render = () => {
    return (
      <g className="chord-line">
        {this.renderPaths()}
      </g>
    );
  }
}

export default ChordLines;
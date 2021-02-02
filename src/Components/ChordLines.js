import React from "react";

import { polarToCartesian } from "../Shared/Math";

import "./ChordLines.scss";

const STROKE_WIDTH_MULTIPLER = 2;
const HALF_VIEWPORT = 500;
const RADIUS = 431;

class ChordLines extends React.Component {
  getPath = (targetId, index) => {
    if (!this.props.segmentMap || !this.props.segmentId) {
      return "";
    }

    const source = this.props.segmentMap.get(this.props.segmentId);
    const target = this.props.segmentMap.get(targetId);

    const halfSourceArcDivision =
      source.arcLength / this.props.targetIds.length / 2;
    const targetArcDivision = (index + 1) / (this.props.targetIds.length + 1);

    // Already applying a rotation from ChordSegement, find the diff between the two segments
    const sourceAngle =
      source.arcLength * (index / this.props.targetIds.length) +
      halfSourceArcDivision;
    const targetAngle =
      target.startAngle -
      source.startAngle +
      target.arcLength * targetArcDivision;
    const sourceXY = polarToCartesian(
      HALF_VIEWPORT,
      HALF_VIEWPORT,
      RADIUS,
      sourceAngle
    );
    const targetXY = polarToCartesian(
      HALF_VIEWPORT,
      HALF_VIEWPORT,
      RADIUS,
      targetAngle
    );

    return `M ${sourceXY.x} ${sourceXY.y} Q ${HALF_VIEWPORT} ${HALF_VIEWPORT}, ${targetXY.x} ${targetXY.y}`;
  };

  getStrokeWidth = targetId => {
    if (!this.props.segmentMap || !this.props.segmentId) {
      return STROKE_WIDTH_MULTIPLER;
    }

    const segment = this.props.segmentMap.get(this.props.segmentId).segment;
    const referenceCount = segment.linkedArticles[targetId];
    return referenceCount * STROKE_WIDTH_MULTIPLER;
  };

  getColor = () => {
    if (this.props.isSelected) {
      return "#f0fc03";
    }

    return this.props.color;
  };

  renderPath = (targetId, index) => {
    return (
      <path
        key={index + 1}
        d={this.getPath(targetId, index)}
        stroke={this.getColor()}
        strokeWidth={this.getStrokeWidth(targetId)}
      />
    );
  };

  renderPaths = () => {
    if (!this.props.targetIds) {
      return [];
    }

    return this.props.targetIds.map((targetId, index) => {
      return this.renderPath(targetId, index);
    });
  };

  render = () => {
    return <g className="chord-line">{this.renderPaths()}</g>;
  };
}

export default ChordLines;

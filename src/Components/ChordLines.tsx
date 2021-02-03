import React from "react";

import { polarToCartesian } from "../Shared/Math";

import "./ChordLines.scss";
import { SegmentData } from "./ChordPanel";

const STROKE_WIDTH_MULTIPLER = 2;
const HALF_VIEWPORT = 500;
const RADIUS = 431;

export interface ChordLinesProps {
  segmentId: string;
  segmentMap: Map<string, SegmentData>;
  isSelected: boolean;
  color: string;
  targetIds: string[];
}

class ChordLines extends React.Component<ChordLinesProps> {
  getPath = (targetId: string, index: number): string => {
    if (!this.props.segmentMap || !this.props.segmentId) {
      return "";
    }

    const source = this.props.segmentMap.get(this.props.segmentId);
    const target = this.props.segmentMap.get(targetId);
    if (!source || !target) {
      return "";
    }

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

  getStrokeWidth = (targetId: string): number => {
    if (!this.props.segmentMap || !this.props.segmentId) {
      return STROKE_WIDTH_MULTIPLER;
    }

    const segment = this.props.segmentMap.get(this.props.segmentId)?.segment;
    if (!segment) {
      return STROKE_WIDTH_MULTIPLER;
    }

    const referenceCount = segment.linkedArticles[targetId];
    return referenceCount * STROKE_WIDTH_MULTIPLER;
  };

  getColor = (): string => {
    if (this.props.isSelected) {
      return "#f0fc03";
    }

    return this.props.color;
  };

  renderPath = (targetId: string, index: number): JSX.Element => {
    return (
      <path
        key={index + 1}
        d={this.getPath(targetId, index)}
        stroke={this.getColor()}
        strokeWidth={this.getStrokeWidth(targetId)}
      />
    );
  };

  renderPaths = (): JSX.Element[] => {
    if (!this.props.targetIds) {
      return [];
    }

    return this.props.targetIds.map((targetId, index) => {
      return this.renderPath(targetId, index);
    });
  };

  render = (): React.ReactNode => {
    return <g className="chord-line">{this.renderPaths()}</g>;
  };
}

export default ChordLines;

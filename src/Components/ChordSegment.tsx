import React, { CSSProperties } from "react";

import ChordLines from "./ChordLines";
import { SegmentData } from "./ChordPanel";
import { polarToCartesian, radiansToDegrees } from "../Shared/Math";

import "./ChordSegment.scss";
import { ArticleResult } from "../Constants/Scheduler";

const SEGMENT_ID_PREFIX = "segment";

const COLOR_TRIADIC_R = 27;
const COLOR_TRIADIC_G = 0;
const COLOR_TRIADIC_B = 199;
const COLOR_RSTEP = 5;

const RADIUS_OUTER = 500;
const RADIUS_INNER = 451;
const HALF_BLOCK_WIDTH = 20;

export interface ChordSegmentProps {
  id: string;
  data: Map<string, SegmentData>;
  isSelected: boolean;
  onSegmentSelect: (segment: ArticleResult, id: string) => void;
}

class ChordSegment extends React.Component<ChordSegmentProps> {
  getSelectedStyle = (): CSSProperties => {
    if (this.props.isSelected) {
      return { stroke: "#f0fc03", strokeWidth: 10 };
    } else {
      return { stroke: "#333", strokeWidth: 2 };
    }
  };

  getColor = (index: number): string => {
    const triadIndex = index % 3;
    const steps = Math.floor(index / 3);

    let colorR, colorB, colorG;
    if (triadIndex === 0) {
      colorR = COLOR_TRIADIC_R + COLOR_RSTEP * steps;
      colorG = COLOR_TRIADIC_G;
      colorB = COLOR_TRIADIC_B;
    } else if (triadIndex === 1) {
      colorR = COLOR_TRIADIC_B;
      colorG = COLOR_TRIADIC_R + COLOR_RSTEP * steps;
      colorB = COLOR_TRIADIC_G;
    } else {
      colorR = COLOR_TRIADIC_G;
      colorG = COLOR_TRIADIC_B;
      colorB = COLOR_TRIADIC_R + COLOR_RSTEP * steps;
    }

    return `rgb(${colorR}, ${colorG}, ${colorB})`;
  };

  getArcPath = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number
  ): string => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  };

  handleSegmentClick = (event: React.MouseEvent): void => {
    const segment = this.props.data.get(this.props.id)?.segment;
    if (this.props.onSegmentSelect && segment) {
      this.props.onSegmentSelect(segment, this.props.id);
    }
  };

  render = (): React.ReactNode => {
    if (!this.props.data || this.props.id === undefined) {
      return <g className="chord-segment"></g>;
    }

    const segmentData = this.props.data.get(this.props.id);
    if (!segmentData) {
      return <g className="chord-segment"></g>;
    }

    const arcLength = segmentData.arcLength;
    const startAngle = radiansToDegrees(segmentData.startAngle);
    const transform = `rotate(${startAngle} ${RADIUS_OUTER} ${RADIUS_OUTER})`;

    const lineX1 = RADIUS_OUTER + RADIUS_INNER - HALF_BLOCK_WIDTH;
    const lineX2 = RADIUS_OUTER + RADIUS_INNER + HALF_BLOCK_WIDTH;

    const color = this.getColor(segmentData.index);

    const targetIds = Object.keys(segmentData.segment.linkedArticles).filter(
      (article) => {
        return this.props.data.has(article);
      }
    );

    return (
      <g
        id={`${SEGMENT_ID_PREFIX}${this.props.id}`}
        className="chord-segment"
        transform={transform}
      >
        <ChordLines
          segmentId={this.props.id}
          segmentMap={this.props.data}
          targetIds={targetIds}
          color={color}
          isSelected={this.props.isSelected}
        />
        <path
          d={this.getArcPath(
            RADIUS_OUTER,
            RADIUS_OUTER,
            RADIUS_INNER + HALF_BLOCK_WIDTH,
            0,
            arcLength
          )}
          style={this.getSelectedStyle()}
          className="border"
        />
        <path
          d={this.getArcPath(
            RADIUS_OUTER,
            RADIUS_OUTER,
            RADIUS_INNER - HALF_BLOCK_WIDTH,
            0,
            arcLength
          )}
          style={this.getSelectedStyle()}
          className="border"
        />
        <line x1={lineX1} y1={RADIUS_OUTER} x2={lineX2} y2={RADIUS_OUTER} />
        <path
          d={this.getArcPath(
            RADIUS_OUTER,
            RADIUS_OUTER,
            RADIUS_INNER,
            0,
            arcLength
          )}
          stroke={color}
          onClick={this.handleSegmentClick}
          className="block"
        />
      </g>
    );
  };
}

export default ChordSegment;

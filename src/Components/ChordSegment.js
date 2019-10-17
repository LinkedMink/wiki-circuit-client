import React from 'react';

import './ChordSegment.scss';

const COLOR_TRIADIC_R = 27;
const COLOR_TRIADIC_G = 0;
const COLOR_TRIADIC_B = 199;
const COLOR_RSTEP = 5;

const RADIUS_OUTER = 500;
const RADIUS_INNER = 455;
const HALF_BLOCK_WIDTH = 20;

class ChordSegment extends React.Component {
  getColor(index) {
    const triadIndex = index % 3;
    const steps = Math.floor(index / 3);
    
    let colorR, colorB, colorG;
    if (triadIndex === 0) {
      colorR = COLOR_TRIADIC_R + (COLOR_RSTEP * steps);
      colorG = COLOR_TRIADIC_G;
      colorB = COLOR_TRIADIC_B;
    } else if (triadIndex === 1) {
      colorR = COLOR_TRIADIC_B;
      colorG = COLOR_TRIADIC_R + (COLOR_RSTEP * steps);
      colorB = COLOR_TRIADIC_G;
    } else {
      colorR = COLOR_TRIADIC_G;
      colorG = COLOR_TRIADIC_B;
      colorB = COLOR_TRIADIC_R + (COLOR_RSTEP * steps);
    }

    return `rgb(${colorR}, ${colorG}, ${colorB})`; 
  }

  getArcPath(x, y, radius, startAngle, endAngle) {
    var start = this.polarToCartesian(x, y, radius, endAngle);
    var end = this.polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  }

  polarToCartesian(centerX, centerY, radius, angle) {
    return {
      x: centerX + (radius * Math.cos(angle)),
      y: centerY + (radius * Math.sin(angle))
    };
  }

  handleSegmentClick= (event) => {
    const segment = this.props.data[this.props.index];
    if (this.props.onSegmentSelect) {
      this.props.onSegmentSelect(segment);
    }
  }

  render() {
    if (!this.props.data || this.props.index === undefined) {
      return <g className="chord-segment"></g>;
    }

    let referencesToSegment = 0;
    let referencesTotal = 0;
    this.props.data.forEach((element, index) => {
      referencesTotal += element.referenceCount;
      if (index < this.props.index) {
        referencesToSegment += element.referenceCount;
      }
    });

    const segment = this.props.data[this.props.index];
    const arcLength = 2 * Math.PI * (segment.referenceCount / referencesTotal);

    const startAngle = 360 * (referencesToSegment / referencesTotal);
    const transform = `rotate(${startAngle} ${RADIUS_OUTER} ${RADIUS_OUTER})`;

    const lineX1 = RADIUS_OUTER + RADIUS_INNER - HALF_BLOCK_WIDTH;
    const lineX2 = RADIUS_OUTER + RADIUS_INNER + HALF_BLOCK_WIDTH;

    return (
      <g className="chord-segment" transform={transform}>
        <path 
          d={this.getArcPath(RADIUS_OUTER, RADIUS_OUTER, RADIUS_INNER + HALF_BLOCK_WIDTH, 0, arcLength)} 
          stroke="#333"
          onClick={this.handleSegmentClick} />
        <path 
          d={this.getArcPath(RADIUS_OUTER, RADIUS_OUTER, RADIUS_INNER - HALF_BLOCK_WIDTH, 0, arcLength)}
          stroke="#333"
          onClick={this.handleSegmentClick} />
        <line x1={lineX1} y1={RADIUS_OUTER} x2={lineX2} y2={RADIUS_OUTER} />
        <path 
          d={this.getArcPath(RADIUS_OUTER, RADIUS_OUTER, RADIUS_INNER, 0, arcLength)} 
          stroke={this.getColor(this.props.index)}
          onClick={this.handleSegmentClick} 
          className="block" />
      </g>
    );
  }
}

export default ChordSegment;
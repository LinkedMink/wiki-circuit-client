import React from "react";

import ChordSegment from "./ChordSegment";
import { ratioToRadians } from "../Shared/Math";

import "./ChordPanel.scss";

const SEGMENT_ID_PREFIX = "segment";
const DEFAULT_SEGMENT_COUNT = 30;
const DIAGRAM_PADDING = 40;

class ChordPanel extends React.Component {
  containerElement = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      selected: undefined,
      width: undefined,
      height: undefined,
    };
  }

  isSegmentSelected = id => {
    return this.state.selected === id;
  };

  getOutlineClass = () => {
    if (this.state.selected === undefined) {
      return "outline";
    } else {
      return "";
    }
  };

  getStyle = () => {
    return {
      width: this.state.width,
      height: this.state.height,
    };
  };

  updateDimensions = () => {
    if (this.containerElement.current) {
      const dimensions = this.containerElement.current.getBoundingClientRect();

      if (dimensions.height > dimensions.width) {
        this.setState({
          width: dimensions.width - DIAGRAM_PADDING,
          height: undefined,
        });
        return;
      } else {
        this.setState({
          width: undefined,
          height: dimensions.height - DIAGRAM_PADDING,
        });
        return;
      }
    }

    this.setState({ width: "60%", height: undefined });
  };

  onSegmentSelect = (segment, id) => {
    if (this.props.onPartSelect) {
      const visibleLinks = {};
      const articles = this.segmentMap.get(id).segment.linkedArticles;
      Object.keys(articles).forEach(article => {
        if (this.segmentMap.has(article)) {
          visibleLinks[article] = articles[article];
        }
      });

      this.props.onPartSelect(segment, visibleLinks);
    }

    this.setState({ selected: id });
  };

  handleRimClick = () => {
    if (this.props.onPartSelect) {
      this.props.onPartSelect();
    }

    this.setState({ selected: undefined });
  };

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  renderSegment = (index, id, segmentMap) => {
    return (
      <ChordSegment
        key={index + 1}
        id={id}
        data={segmentMap}
        isSelected={this.isSegmentSelected(id)}
        onSegmentSelect={this.onSegmentSelect}
      />
    );
  };

  renderOverlay = () => {
    if (this.state.selected) {
      return <use xlinkHref={`#${SEGMENT_ID_PREFIX}${this.state.selected}`} />;
    }
  };

  renderSegments = () => {
    if (!this.props.data) {
      return;
    }

    const segmentCount = this.props.segmentCount
      ? this.props.segmentCount
      : DEFAULT_SEGMENT_COUNT;
    this.segmentData = this.props.data.slice(0, segmentCount);

    let referencesTotal = 0;
    this.segmentData.forEach(element => {
      referencesTotal += element.referenceCount;
    });

    let referencesToSegment = 0;
    this.segmentMap = new Map();
    this.segmentData.forEach((segment, index) => {
      this.segmentMap.set(segment.id, {
        segment: segment,
        index: index,
        startAngle: ratioToRadians(referencesToSegment / referencesTotal),
        arcLength: ratioToRadians(segment.referenceCount / referencesTotal),
      });

      referencesToSegment += segment.referenceCount;
    });

    return this.segmentData.map((segment, index) =>
      this.renderSegment(index, segment.id, this.segmentMap)
    );
  };

  render = () => {
    return (
      <div className="chord-diagram" ref={this.containerElement}>
        <svg style={this.getStyle()} viewBox="0 0 1000 1000">
          <circle
            cx="50%"
            cy="50%"
            r="495"
            className={this.getOutlineClass()}
          />
          <circle
            cx="50%"
            cy="50%"
            r="477"
            className={this.getOutlineClass()}
          />
          <circle
            cx="50%"
            cy="50%"
            r="486"
            className="outer-rim"
            onClick={this.handleRimClick}
          />
          {this.renderSegments()}
          {this.renderOverlay()}
        </svg>
      </div>
    );
  };
}

export default ChordPanel;

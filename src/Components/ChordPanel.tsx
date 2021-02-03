import { Property } from "csstype";
import React, { CSSProperties } from "react";

import ChordSegment from "./ChordSegment";
import { ratioToRadians } from "../Shared/Math";

import "./ChordPanel.scss";
import { ArticleResult } from "../Constants/Scheduler";

const SEGMENT_ID_PREFIX = "segment";
const DEFAULT_SEGMENT_COUNT = 30;
const DIAGRAM_PADDING = 40;

export interface SegmentData {
  segment: ArticleResult;
  index: number;
  startAngle: number;
  arcLength: number;
}

export interface ChordPanelProps {
  data: ArticleResult[];
  segmentCount: number;
  onPartSelect: (
    part?: ArticleResult,
    visibleLinks?: Record<string, number>
  ) => void;
}

export interface ChordPanelState {
  selected?: string;
  width?: Property.Width;
  height?: Property.Height;
}

class ChordPanel extends React.Component<ChordPanelProps, ChordPanelState> {
  private readonly containerElement = React.createRef<HTMLDivElement>();
  private segmentMap: Map<string, SegmentData>;
  private segmentArticles: ArticleResult[];

  constructor(props: ChordPanelProps) {
    super(props);

    this.state = {
      selected: undefined,
      width: undefined,
      height: undefined,
    };
  }

  isSegmentSelected = (id: string): boolean => {
    return this.state.selected === id;
  };

  getOutlineClass = (): string => {
    if (this.state.selected === undefined) {
      return "outline";
    } else {
      return "";
    }
  };

  getStyle = (): CSSProperties => {
    return {
      width: this.state.width,
      height: this.state.height,
    };
  };

  updateDimensions = (): void => {
    if (this.containerElement.current) {
      const dimensions = this.containerElement.current.getBoundingClientRect();

      if (dimensions.height > dimensions.width) {
        this.setState({
          width: (dimensions.width - DIAGRAM_PADDING).toString(),
          height: undefined,
        });
        return;
      } else {
        this.setState({
          width: undefined,
          height: (dimensions.height - DIAGRAM_PADDING).toString(),
        });
        return;
      }
    }

    this.setState({ width: "60%", height: undefined });
  };

  onSegmentSelect = (segment: ArticleResult, id: string): void => {
    if (this.props.onPartSelect) {
      const visibleLinks: Record<string, number> = {};
      const articles = this.segmentMap.get(id)?.segment.linkedArticles;

      if (articles) {
        Object.keys(articles).forEach((article) => {
          if (this.segmentMap.has(article)) {
            visibleLinks[article] = articles[article];
          }
        });

        this.props.onPartSelect(segment, visibleLinks);
      }
    }

    this.setState({ selected: id });
  };

  handleRimClick = (event: React.MouseEvent): void => {
    if (this.props.onPartSelect) {
      this.props.onPartSelect();
    }

    this.setState({ selected: undefined });
  };

  componentDidMount(): void {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount(): void {
    window.removeEventListener("resize", this.updateDimensions);
  }

  renderSegment = (
    index: number,
    id: string,
    segmentMap: Map<string, SegmentData>
  ): JSX.Element => {
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

  renderOverlay = (): JSX.Element | void => {
    if (this.state.selected) {
      return <use xlinkHref={`#${SEGMENT_ID_PREFIX}${this.state.selected}`} />;
    }
  };

  renderSegments = (): JSX.Element[] | void => {
    if (!this.props.data) {
      return;
    }

    const segmentCount = this.props.segmentCount
      ? this.props.segmentCount
      : DEFAULT_SEGMENT_COUNT;
    this.segmentArticles = this.props.data.slice(0, segmentCount);

    let referencesTotal = 0;
    this.segmentArticles.forEach((element) => {
      referencesTotal += element.referenceCount;
    });

    let referencesToSegment = 0;
    this.segmentMap = new Map<string, SegmentData>();
    this.segmentArticles.forEach((segment, index) => {
      this.segmentMap.set(segment.id, {
        segment: segment,
        index: index,
        startAngle: ratioToRadians(referencesToSegment / referencesTotal),
        arcLength: ratioToRadians(segment.referenceCount / referencesTotal),
      });

      referencesToSegment += segment.referenceCount;
    });

    return this.segmentArticles.map((segment, index) =>
      this.renderSegment(index, segment.id, this.segmentMap)
    );
  };

  render = (): React.ReactNode => {
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

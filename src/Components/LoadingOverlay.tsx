import React, { CSSProperties } from "react";
import { ProgressBar } from "react-bootstrap";

import "./LoadingOverlay.scss";

export interface LoadingOverlayaProps {
  isLoading: boolean;
  percentComplete?: number;
  message?: string;
}

class LoadingOverlay extends React.Component<LoadingOverlayaProps> {
  private readonly styles: Record<string, CSSProperties>;

  constructor(props: LoadingOverlayaProps) {
    super(props);

    this.styles = {
      visible: {
        zIndex: 100,
        opacity: 0.6,
      },
      invisible: {
        zIndex: -1,
        opacity: 0,
      },
    };
  }

  getOverlayStyle(): CSSProperties {
    if (this.props.isLoading) {
      return this.styles.visible;
    } else {
      return this.styles.invisible;
    }
  }

  renderLoadingAnimation(): JSX.Element {
    if (Number.isInteger(this.props.percentComplete)) {
      return (
        <div>
          <div>
            <ProgressBar
              animated
              now={
                this.props.percentComplete
                  ? this.props.percentComplete
                  : undefined
              }
            />
            <span>{this.props.message}</span>
            <span>{this.props.percentComplete}%</span>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <img alt="Loading Animation" src="/img/gears.svg" />
          <br />
          <span>{this.props.message}</span>
        </div>
      );
    }
  }

  render(): React.ReactNode {
    return (
      <div className="loading-overlay" style={this.getOverlayStyle()}>
        {this.renderLoadingAnimation()}
      </div>
    );
  }
}

export default LoadingOverlay;

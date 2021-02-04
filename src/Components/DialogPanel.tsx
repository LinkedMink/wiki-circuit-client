import React from "react";
import { Button, Modal } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";

export interface DialogPanelProps extends RouteComponentProps {
  title?: string;
  text?: string;
  show?: boolean;
  redirect?: string;
  close?: () => void;
}

class DialogPanel extends React.Component<DialogPanelProps> {
  constructor(props: DialogPanelProps) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(): void {
    if (this.props.redirect && this.props.history) {
      this.props.history.push(this.props.redirect);
    }

    if (this.props.close) {
      this.props.close();
    }
  }

  render(): React.ReactNode {
    return (
      <Modal onHide={this.handleClose} show={this.props.show}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{this.props.text}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default DialogPanel;

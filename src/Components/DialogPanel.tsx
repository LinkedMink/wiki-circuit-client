import React from "react";
import { Button, Modal } from "react-bootstrap";

export interface DialogPanelProps {
  title?: string;
  text?: string;
  show?: boolean;
  close?: () => void;
}

class DialogPanel extends React.Component<DialogPanelProps> {
  constructor(props: DialogPanelProps) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(): void {
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

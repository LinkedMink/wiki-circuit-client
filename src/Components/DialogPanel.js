import React from "react";
import { Button, Modal } from "react-bootstrap";

class DialogPanel extends React.Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    if (this.props.close) {
      this.props.close();
    }
  }

  render() {
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

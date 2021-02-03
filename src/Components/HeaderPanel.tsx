import React from "react";
import { Nav, Navbar } from "react-bootstrap";

class HeaderPanel extends React.Component {
  render(): React.ReactNode {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Wiki Circuit</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav></Nav>
          <Nav></Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default HeaderPanel;

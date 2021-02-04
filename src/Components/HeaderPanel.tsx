import React from "react";
import { Navbar } from "react-bootstrap";
import LeftNavGroupContainer from "../Containers/LeftNavGroupContainer";
import RightNavGroupContainer from "../Containers/RightNavGroupContainer";
import "./HeaderPanel.scss";

class HeaderPanel extends React.Component {
  render(): React.ReactNode {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Wiki Circuit</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <LeftNavGroupContainer></LeftNavGroupContainer>
          <RightNavGroupContainer></RightNavGroupContainer>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default HeaderPanel;

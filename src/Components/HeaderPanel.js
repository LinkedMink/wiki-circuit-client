import React from 'react';
import { BrowserRouter as Link } from "react-router-dom";
import { Navbar } from 'react-bootstrap';

class HeaderPanel extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <Link to="/">Wiki Circuit</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar>
    );
  }
}

export default HeaderPanel;
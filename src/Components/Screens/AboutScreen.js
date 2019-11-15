import React from 'react';
import { Row } from 'react-bootstrap';

class AboutScreen extends React.Component {
  render() {
    return (
      <div className='screen-container'>
        <Row className="header-block">
          <h2>About</h2>
        </Row>
        <p>
          Wiki Circuit allows users to analyze connectivity between Wikipedia articles. The application downloads an initial input
          article. From this input, it will find all the links to other articles inside the body and download the linked articles. 
          It will precede to download articles in a recursive fashion upto a specified depth. The links will be parsed and counted 
          to build a map of which articles are linked to each other.
        </p>
        <p>
          In a web user interface, the generated data is used to display diagrams to visualize the linkage between articles. The user
          can select diagram segments to drill down into the data in a more detail. The UI piece is still a work in progress.
        </p>
        <p>
          Wiki Circuit requires two components to function:
        </p>
        <ul>
          <li>
            <a href="https://github.com/LinkedMink/wiki-circuit-client">Wiki Circuit - Client</a>
          </li>
          <li>
            <a href="https://github.com/LinkedMink/wiki-circuit-server">Wiki Circuit - Server</a>
          </li>
        </ul>
        <p>
          Note that the code was never written to be production ready. It was written mainly to demonstrate the various technologies
          used to build the software.
        </p>
        <h3>Contact</h3>
        <p>
          Email: <a href="mailto:harlan@linkedmink.space">harlan@linkedmink.space</a>
        </p>
      </div>
    );
  }
}

export default AboutScreen;
import React from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articleName: "",
    };

    this.handleChange  = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.props.history) {
      const route = `/visualization/${this.state.articleName.replace(' ', '_')}`;
      this.props.history.push(route);
    }
  }

  render() {
    return (
      <div>
        <h2>Wiki Circuit: Article Connectivity Analyzer</h2>
        <p>
          Analyze the links in an English Wikipedia article to determine how connected the articles are.
        </p>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row} controlId="articleName">
            <Form.Label column xs="12">
              Article Name
            </Form.Label>
            <Col xs="12" sm="8" md="6" lg="5">
              <Form.Control type="articleName" 
                            placeholder="Web scraping => https://en.wikipedia.org/wiki/Web_scraping" 
                            value={this.state.articleName} 
                            onChange={this.handleChange} 
                            required />
            </Col>
          </Form.Group>

          <Button variant="primary" type="submit">
            Visualize
          </Button>
        </Form>
      </div>
    );
  }
}

export default HomeScreen;
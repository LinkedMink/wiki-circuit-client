import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

class ArticleNameSubmit extends React.Component {
  inputElement = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      articleName: ""
    };
  }

  componentDidMount = () => {
    if (this.inputElement && this.inputElement.focus) {
      this.inputElement.focus();
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.props.history) {
      const encoded = encodeURIComponent(this.state.articleName.replace(' ', '_'));
      const route = `/visualization/${encoded}`;
      this.props.history.push(route);
    }
  }

  render = () => {
    return (
      <Form onSubmit={this.handleSubmit}>
        <InputGroup>
          <Form.Control 
            id="articleName" 
            type="text" 
            ref={this.inputElement}
            placeholder="https://en.wikipedia.org/wiki/Web_scraping => Web scraping" 
            value={this.state.articleName} 
            onChange={this.handleChange} 
            required />
          <InputGroup.Append>
            <Button variant={this.props.buttonVariant ? this.props.buttonVariant : "primary"} type="submit">
              <span className="oi oi-magnifying-glass"></span>
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    );
  }
}

export default ArticleNameSubmit;
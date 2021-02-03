import * as React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";

export interface ArticleNameSubmitState {
  articleName: string;
  [key: string]: unknown;
}

export interface ArticleNameSubmitProps extends RouteComponentProps {
  buttonVariant?: string;
}

class ArticleNameSubmit extends React.Component<
  ArticleNameSubmitProps,
  ArticleNameSubmitState
> {
  inputElement = React.createRef<HTMLInputElement>();

  constructor(props: ArticleNameSubmitProps) {
    super(props);

    this.state = {
      articleName: "",
    };
  }

  componentDidMount = (): void => {
    if (this.inputElement && this.inputElement.current) {
      this.inputElement.current.focus();
    }
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (this.props.history) {
      const encoded = encodeURIComponent(
        this.state.articleName.replace(" ", "_")
      );
      const route = `/visualization/${encoded}`;
      this.props.history.push(route);
    }
  };

  render = (): React.ReactNode => {
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
            required
          />
          <InputGroup.Append>
            <Button
              variant={
                this.props.buttonVariant ? this.props.buttonVariant : "primary"
              }
              type="submit"
            >
              <span className="oi oi-magnifying-glass"></span>
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    );
  };
}

export default ArticleNameSubmit;

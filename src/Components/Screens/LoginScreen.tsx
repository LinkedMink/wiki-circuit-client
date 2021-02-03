import * as React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Redirect, Link as RouterLink, Link } from "react-router-dom";

import {
  FieldResult,
  ValidationRules,
  ValidationRuleType,
  Validator,
} from "../../Shared/Validator";

export interface LoginScreenProps {
  isLoggedIn: boolean;
  login: (email: string, password: string, rememberMe: boolean) => void;
}

export interface LoginScreenFields {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginScreenState extends LoginScreenFields {
  errors: LoginScreenErrors;
  [key: string]: unknown;
}

type LoginScreenErrors = Record<keyof LoginScreenFields, FieldResult | never>;

const validationRules: ValidationRules<LoginScreenFields> = {
  email: {
    label: "Email Address",
    rules: [ValidationRuleType.REQUIRED],
  },
  password: {
    label: "Password",
    rules: [ValidationRuleType.REQUIRED],
  },
  rememberMe: {
    label: "Remember me",
    rules: [],
  },
};

class LoginScreen extends React.Component<LoginScreenProps, LoginScreenState> {
  private readonly validator = new Validator<LoginScreenFields>(
    validationRules
  );

  state = {
    email: "",
    password: "",
    rememberMe: false,
    errors: this.validator.getDefaultErrorState(),
  };

  getLinkReference = (
    path: string
  ): React.ForwardRefExoticComponent<
    React.RefAttributes<HTMLAnchorElement>
  > => {
    const ref = React.forwardRef<HTMLAnchorElement>((props, ref) => (
      <RouterLink innerRef={ref} to={path} {...props} />
    ));
    ref.displayName = `Link ${path}`;
    return ref;
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const validationState = this.validator.validate(this.state);
    this.setState({ errors: validationState.errors });

    if (validationState.isValid && this.props.login) {
      this.props.login(
        this.state.email,
        this.state.password,
        this.state.rememberMe
      );
    }
  };

  render = (): React.ReactNode => {
    if (this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div className="screen-container">
        <Row className="header-block">
          <h2>Login</h2>
        </Row>
        <Form
          onSubmit={this.handleSubmit}
          validated={!!this.state.errors}
          noValidate
        >
          <Form.Group controlId="email">
            <Form.Label>{validationRules.email.label}</Form.Label>
            <Form.Control
              type="email"
              autoComplete="email"
              onChange={this.handleChange}
              value={this.state.email}
              placeholder="name@example.com"
              required
              autoFocus
            />
            <Form.Control.Feedback
              type={this.state.errors.email.isInvalid ? "invalid" : "valid"}
            >
              {this.state.errors.email.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>{validationRules.password.label}</Form.Label>
            <Form.Control
              type="password"
              autoComplete="current-password"
              onChange={this.handleChange}
              value={this.state.password}
              required
            />
            <Form.Control.Feedback
              type={this.state.errors.password.isInvalid ? "invalid" : "valid"}
            >
              {this.state.errors.password.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="rememberMe">
            <Form.Check
              label={validationRules.rememberMe.label}
              value={this.state.rememberMe.toString()}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign In
          </Button>
        </Form>
        <Row>
          <Col>
            <Link to="/password-reset">Forgot password?</Link>
          </Col>
          <Col>
            <Link to="/register">{"Don't have an account? Sign Up"}</Link>
          </Col>
        </Row>
      </div>
    );
  };
}

export default LoginScreen;

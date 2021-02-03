import * as React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Redirect, Link as RouterLink, Link } from "react-router-dom";

import { MIN_PASSWORD_LENGTH } from "../../Constants/Account";
import {
  FieldResult,
  ValidationRules,
  ValidationRuleType,
  Validator,
} from "../../Shared/Validator";

export interface RegisterScreenProps {
  isLoggedIn: boolean;
  register: (email: string, password: string) => void;
}

export interface RegisterScreenFields {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterScreenState extends RegisterScreenFields {
  errors: RegisterScreenErrors;
  [key: string]: unknown;
}

type RegisterScreenErrors = Record<
  keyof RegisterScreenFields,
  FieldResult | never
>;

const validationRules: ValidationRules<RegisterScreenFields> = {
  email: {
    label: "Email Address",
    rules: [ValidationRuleType.REQUIRED, ValidationRuleType.EMAIL],
  },
  password: {
    label: "Password",
    rules: [
      ValidationRuleType.REQUIRED,
      [ValidationRuleType.LENGTH, MIN_PASSWORD_LENGTH],
    ],
  },
  confirmPassword: {
    label: "Confirm Password",
    rules: [
      ValidationRuleType.REQUIRED,
      [ValidationRuleType.COMPARE, "password"],
    ],
  },
};

class RegisterScreen extends React.Component<
  RegisterScreenProps,
  RegisterScreenState
> {
  private readonly validator = new Validator<RegisterScreenFields>(
    validationRules
  );

  state = {
    email: "",
    password: "",
    confirmPassword: "",
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

    if (validationState.isValid && this.props.register) {
      this.props.register(this.state.email, this.state.password);
    }
  };

  render(): React.ReactNode {
    if (this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div className="screen-container">
        <Row className="header-block">
          <h2>Register</h2>
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
          <Form.Group controlId="confirmPassword">
            <Form.Label>{validationRules.confirmPassword.label}</Form.Label>
            <Form.Control
              type="password"
              onChange={this.handleChange}
              value={this.state.confirmPassword}
              required
            />
            <Form.Control.Feedback
              type={
                this.state.errors.confirmPassword.isInvalid
                  ? "invalid"
                  : "valid"
              }
            >
              {this.state.errors.confirmPassword.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <Row>
          <Col>
            <Link to="/login">{"Already have an account? Login"}</Link>
          </Col>
        </Row>
      </div>
    );
  }
}

export default RegisterScreen;

import * as React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Redirect, Link as RouterLink, Link } from "react-router-dom";

import {
  FieldResult,
  ValidationRules,
  ValidationRuleType,
  Validator,
} from "../../Shared/Validator";

export interface PasswordResetScreenProps {
  isLoggedIn: boolean;
  getResetLink: (email: string) => void;
}

export interface PasswordResetScreenFields {
  email: string;
}

export interface PasswordResetScreenState extends PasswordResetScreenFields {
  errors: PasswordResetScreenErrors;
  [key: string]: unknown;
}

type PasswordResetScreenErrors = Record<
  keyof PasswordResetScreenFields,
  FieldResult | never
>;

const validationRules: ValidationRules<PasswordResetScreenFields> = {
  email: {
    label: "Email Address",
    rules: [ValidationRuleType.REQUIRED, ValidationRuleType.EMAIL],
  },
};

class PasswordResetScreen extends React.Component<
  PasswordResetScreenProps,
  PasswordResetScreenState
> {
  private readonly validator = new Validator<PasswordResetScreenFields>(
    validationRules
  );

  state = {
    email: "",
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

    if (validationState.isValid && this.props.getResetLink) {
      this.props.getResetLink(this.state.email);
    }
  };

  render(): React.ReactNode {
    if (this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div className="screen-container">
        <Row className="header-block">
          <h2>Reset Password</h2>
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
          <Button variant="primary" type="submit">
            Send Reset Link
          </Button>
        </Form>
        <Row>
          <Col>
            <Link to="/login">{"Already know your password? Login"}</Link>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PasswordResetScreen;

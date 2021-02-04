import * as React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Redirect, Link as RouterLink, Link } from "react-router-dom";

import { MIN_PASSWORD_LENGTH } from "../../Constants/Account";
import {
  FieldResult,
  FormComponentState,
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

export type RegisterScreenState = RegisterScreenFields &
  FormComponentState<RegisterScreenFields>;

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

  constructor(props: RegisterScreenProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      errors: this.validator.getDefaultErrorState(),
    };
  }

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
    this.setState({ ...validationState });

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
        <h2>Register</h2>
        <Form
          onSubmit={this.handleSubmit}
          validated={this.state.isValid !== undefined}
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
            {this.state.errors.email.isInvalid && (
              <Form.Control.Feedback type="invalid">
                {this.state.errors.email.message}
              </Form.Control.Feedback>
            )}
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
            {this.state.errors.password.isInvalid && (
              <Form.Control.Feedback type="invalid">
                {this.state.errors.password.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>{validationRules.confirmPassword.label}</Form.Label>
            <Form.Control
              type="password"
              onChange={this.handleChange}
              value={this.state.confirmPassword}
              required
            />
            {this.state.errors.confirmPassword.isInvalid && (
              <Form.Control.Feedback type="invalid">
                {this.state.errors.confirmPassword.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <Row className="form-post-links">
          <Col>
            <Link to="/login">{"Already have an account? Login"}</Link>
          </Col>
        </Row>
      </div>
    );
  }
}

export default RegisterScreen;

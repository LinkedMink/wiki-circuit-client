import * as React from "react";
import { Redirect, Link as RouterLink, Link } from "react-router-dom";

import {
  FieldResult,
  ValidationRules,
  ValidationRuleType,
  Validator,
} from "../../Shared/Validator";
import { RouteSetPasswordComponentProps } from "../../Constants/RouteParams";
import { Row, Form, Button, Col } from "react-bootstrap";

export interface SetPasswordScreenProps extends RouteSetPasswordComponentProps {
  isLoggedIn: boolean;
  resetPassword: (email: string, resetToken: string, password: string) => void;
}

export interface SetPasswordScreenFields {
  password: string;
  confirmPassword: string;
}

export interface SetPasswordScreenState extends SetPasswordScreenFields {
  errors: SetPasswordScreenErrors;
  [key: string]: unknown;
}

export type SetPasswordScreenErrors = Record<
  keyof SetPasswordScreenFields,
  FieldResult | never
>;

const validationRules: ValidationRules<SetPasswordScreenFields> = {
  password: {
    label: "Password",
    rules: [ValidationRuleType.REQUIRED, [ValidationRuleType.LENGTH, 8]],
  },
  confirmPassword: {
    label: "Confirm Password",
    rules: [
      ValidationRuleType.REQUIRED,
      [ValidationRuleType.COMPARE, "password"],
    ],
  },
};

class SetPasswordScreen extends React.Component<
  SetPasswordScreenProps,
  SetPasswordScreenState
> {
  private readonly validator = new Validator<SetPasswordScreenFields>(
    validationRules
  );

  state = {
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
    const { email, resetToken } = this.props.match.params;

    const validationState = this.validator.validate(this.state);
    this.setState({ errors: validationState.errors });

    if (validationState.isValid && this.props.resetPassword) {
      this.props.resetPassword(email, resetToken, this.state.password);
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
            Reset Password
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

export default SetPasswordScreen;

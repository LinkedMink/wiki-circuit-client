import * as React from "react";
import { Button, Form, Row } from "react-bootstrap";

import { AccountModel, MIN_PASSWORD_LENGTH } from "../../Constants/Account";
import {
  FieldResult,
  ValidationRules,
  ValidationRuleType,
  Validator,
} from "../../Shared/Validator";

export interface AccountScreenProps {
  isLoggedIn: boolean;
  profile: AccountModel;
  deleteConfirmResult?: boolean;
  getAccountData: () => void;
  saveAccountData: (data: Partial<AccountScreenFields>) => void;
  deleteAccountData: () => void;
  deleteConfirm: () => void;
}

export interface AccountScreenFields {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AccountScreenState extends AccountScreenFields {
  hasRetreivedProfile: boolean;
  formIsNotDirty: boolean;
  errors: AccountScreenErrors;
  [key: string]: unknown;
}

type AccountScreenErrors = Record<
  keyof AccountScreenFields,
  FieldResult | never
>;

const validationRules: ValidationRules<AccountScreenFields> = {
  email: {
    label: "Email Address",
    rules: [ValidationRuleType.EMAIL],
  },
  password: {
    label: "Password",
    rules: [[ValidationRuleType.LENGTH, MIN_PASSWORD_LENGTH]],
  },
  confirmPassword: {
    label: "Confirm Password",
    rules: [[ValidationRuleType.COMPARE, "password"]],
  },
};

class AccountScreen extends React.Component<
  AccountScreenProps,
  AccountScreenState
> {
  private readonly validator = new Validator<AccountScreenFields>(
    validationRules
  );

  state = {
    email: "",
    password: "",
    confirmPassword: "",
    hasRetreivedProfile: false,
    formIsNotDirty: false,
    errors: this.validator.getDefaultErrorState(),
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!this.isDirty()) {
      return;
    }

    const dirtyProperties = {} as Partial<AccountScreenFields>;
    if (this.state.email !== this.props.profile.email) {
      dirtyProperties.email = this.state.email;
    }

    if (this.state.password !== "") {
      dirtyProperties.password = this.state.password;
    }

    const validationState = this.validator.validate(this.state);
    this.setState({ errors: validationState.errors });

    if (validationState.isValid && this.props.saveAccountData) {
      this.props.saveAccountData(dirtyProperties);
    }
  };

  handleDelete = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    if (this.props.deleteConfirm) {
      this.props.deleteConfirm();
    }
  };

  isDirty = (): boolean => {
    return (
      this.props.profile &&
      (this.state.email !== this.props.profile.email ||
        this.state.password !== "")
    );
  };

  getProfile = (): AccountModel | Record<string, never> => {
    if (!this.props.profile) {
      if (this.props.getAccountData) {
        this.props.getAccountData();
      }

      return {};
    }

    if (!this.state.hasRetreivedProfile) {
      this.setState({
        email: this.props.profile.email,
        hasRetreivedProfile: true,
      });
    }

    return this.props.profile;
  };

  componentDidUpdate = (
    prevProps: unknown,
    prevState: unknown,
    snapshot: unknown
  ): void => {
    if (this.props.deleteConfirmResult !== undefined) {
      if (this.props.deleteConfirmResult === true) {
        if (this.props.deleteAccountData) {
          this.props.deleteAccountData();
        }
      } else {
        if (this.props.deleteConfirm) {
          this.props.deleteConfirm();
        }
      }
    }
  };

  render = (): React.ReactNode => {
    return (
      <div className="screen-container">
        <Row className="header-block">
          <h2>Account</h2>
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
          <Button variant="primary" type="submit" disabled={!this.isDirty()}>
            Save
          </Button>
        </Form>
        <h3>Delete</h3>
        <Button variant="danger" onClick={this.handleDelete}>
          Delete Account
        </Button>
      </div>
    );
  };
}

export default AccountScreen;

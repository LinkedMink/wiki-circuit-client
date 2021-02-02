import React from "react";
import { Redirect, Link as RouterLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import { ValidationRule, Validator } from "../../Shared/Validator";

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SetPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.rules = {
      password: {
        label: "Password",
        rules: [ValidationRule.REQUIRED, [ValidationRule.LENGTH, 8]],
      },
      confirmPassword: {
        label: "Confirm Password",
        rules: [ValidationRule.REQUIRED, [ValidationRule.COMPARE, "password"]],
      },
    };

    this.validator = new Validator(this.rules);

    this.state = {
      password: "",
      confirmPassword: "",
      errors: this.validator.getDefaultErrorState(),
    };
  }

  getLinkReference = path => {
    return React.forwardRef((props, ref) => (
      <RouterLink innerRef={ref} to={path} {...props} />
    ));
  };

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, resetToken } = this.props.match.params;

    const validationState = this.validator.validate(this.state);
    this.setState({ errors: validationState.errors });

    if (validationState.isValid && this.props.resetPassword) {
      this.props.resetPassword(email, resetToken, this.state.password);
    }
  };

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <Container maxWidth="md">
        <Paper className={this.props.classes.paper}>
          <Typography variant="h3">Reset Password</Typography>
          <form
            className={this.props.classes.form}
            onSubmit={this.handleSubmit}
            noValidate
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={this.rules.password.label}
              type="password"
              value={this.state.password}
              error={this.state.errors.password.isInvalid}
              helperText={this.state.errors.password.message}
              onChange={this.handleChange}
              id="password"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label={this.rules.confirmPassword.label}
              type="password"
              value={this.state.confirmPassword}
              error={this.state.errors.confirmPassword.isInvalid}
              helperText={this.state.errors.confirmPassword.message}
              onChange={this.handleChange}
              id="confirmPassword"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={this.props.classes.submit}
            >
              Reset Password
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  component={this.getLinkReference("/login")}
                  variant="body2"
                >
                  {"Already know your password? Login"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    );
  }
}

export default withStyles(styles)(SetPasswordScreen);

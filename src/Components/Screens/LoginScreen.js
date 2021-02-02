import React from "react";
import { Redirect, Link as RouterLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.rules = {
      email: {
        label: "Email Address",
        rules: [ValidationRule.REQUIRED],
      },
      password: {
        label: "Password",
        rules: [ValidationRule.REQUIRED],
      },
    };

    this.validator = new Validator(this.rules);

    this.state = {
      email: "",
      password: "",
      rememberMe: false,
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

    const validationState = this.validator.validate(this.state);
    this.setState({ errors: validationState.errors });

    if (validationState.isValid && this.props.login) {
      this.props.login(
        this.state.email,
        this.state.password,
        this.state.password
      );
    }
  };

  render = () => {
    if (this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <Container maxWidth="md">
        <Paper className={this.props.classes.paper}>
          <Typography variant="h3">Login</Typography>
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
              id="email"
              label={this.rules.email.label}
              name="email"
              autoComplete="email"
              type="email"
              value={this.state.email}
              error={this.state.errors.email.isInvalid}
              helperText={this.state.errors.email.message}
              onChange={this.handleChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={this.rules.password.label}
              type="password"
              id="password"
              value={this.state.password}
              error={this.state.errors.password.isInvalid}
              helperText={this.state.errors.password.message}
              onChange={this.handleChange}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={
                <Checkbox
                  id="rememberMe"
                  value={this.state.rememberMe}
                  color="primary"
                  onChange={this.handleChange}
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={this.props.classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  component={this.getLinkReference("/password-reset")}
                  variant="body2"
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  component={this.getLinkReference("/register")}
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    );
  };
}

export default withStyles(styles)(LoginScreen);

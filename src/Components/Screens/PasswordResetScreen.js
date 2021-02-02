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

class PasswordResetScreen extends React.Component {
  constructor(props) {
    super(props);
    this.rules = {
      email: {
        label: "Email Address",
        rules: [ValidationRule.REQUIRED, ValidationRule.EMAIL],
      },
    };

    this.validator = new Validator(this.rules);

    this.state = {
      email: "",
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

    if (validationState.isValid && this.props.getResetLink) {
      this.props.getResetLink(this.state.email);
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
              id="email"
              label={this.rules.email.label}
              name="email"
              autoComplete="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
              error={this.state.errors.email.isInvalid}
              helperText={this.state.errors.email.message}
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={this.props.classes.submit}
            >
              Send Reset Link
            </Button>
            <Grid container>
              <Grid item xs>
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

export default withStyles(styles)(PasswordResetScreen);

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
});

class UnauthorizedScreen extends React.Component {
  render() {
    return (
      <Container maxWidth="lg">
        <Paper className={this.props.classes.paper}>
          <Typography variant="h3">Unauthorized</Typography>
          <Typography variant="body1">
            The requested page requires a user claim:{" "}
            {this.props.match.params.claims}
          </Typography>
        </Paper>
      </Container>
    );
  }
}

export default withStyles(styles)(UnauthorizedScreen);

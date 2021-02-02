import * as React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import HeaderPanel from "./Components/HeaderPanel";
import LoadingOverlay from "./Components/LoadingOverlay";
import NavigationMenuContainer from "./Containers/NavigationMenuContainer";
import AlertDialogPanel from "./Containers/AlertDialogPanel";
import LoadingOverlayContainer from "./Containers/LoadingOverlayContainer";

import HomeScreen from "./Components/Screens/HomeScreen";
import VisualizationContainer from "./Containers/VisualizationContainer";
import AboutScreen from "./Components/Screens/AboutScreen";

import "./App.scss";

export interface AppStateProps {
  isConfigLoaded: boolean;
  isLoggedIn: boolean;
}

export interface AppDispatchProps {
  getConfig: () => void;
  getAccount: () => void;
}

export type AppProps = AppStateProps & AppDispatchProps;

class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);

    if (!this.props.isConfigLoaded && this.props.getConfig) {
      this.props.getConfig();
    }

    if (this.props.getAccount) {
      this.props.getAccount();
    }
  }

  render(): React.ReactNode {
    if (!this.props.isConfigLoaded) {
      return <LoadingOverlay isLoading={true} />;
    }

    return (
      <BrowserRouter>
        <HeaderPanel />
        <Container className="app-container" fluid={true}>
          <LoadingOverlayContainer />
          <Row>
            <Col xs="12" sm="12" md="2">
              <NavigationMenuContainer />
            </Col>
            <Col xs="12" sm="12" md="10">
              <Switch>
                <Route exact path="/home" component={HomeScreen} />
                <Route
                  exact
                  path="/visualization/:id"
                  component={VisualizationContainer}
                />
                <Route exact path="/about" component={AboutScreen} />
                <Redirect from="/" to="/home" />
              </Switch>
            </Col>
          </Row>
        </Container>
        <AlertDialogPanel />
      </BrowserRouter>
    );
  }
}

export default App;

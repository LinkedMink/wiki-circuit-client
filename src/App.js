import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

import './App.scss';

import HeaderPanel from './Components/HeaderPanel';
import LoadingOverlay from './Components/LoadingOverlay';
import NavigationMenuContainer from './Containers/NavigationMenuContainer';
import AlertDialogPanel from './Containers/AlertDialogPanel';
import LoadingOverlayContainer from './Containers/LoadingOverlayContainer';

import HomeScreen from './Components/Screens/HomeScreen';
import VisualizationContainer from './Containers/VisualizationContainer';
import AboutScreen from './Components/Screens/AboutScreen';

class App extends React.Component {
  constructor(props) {
    super(props);

    if (!this.props.isConfigLoaded && this.props.getConfig) {
      this.props.getConfig();
    }
  }

  render() {
    if (!this.props.isConfigLoaded) {
      return <LoadingOverlay isLoading={true} />
    }

    return (
      <BrowserRouter>
        <HeaderPanel />
        <Container className="app-container" fluid="true">
          <LoadingOverlayContainer />
          <Row>
            <Col xs="12" sm="12" md="2">
              <NavigationMenuContainer />
            </Col>
            <Col xs="12" sm="12" md="10">
              <Switch>
                <Route exact path="/home" component={HomeScreen} />
                <Route exact path="/visualization/:id" component={VisualizationContainer} />
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

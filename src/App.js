import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

import './App.scss';

import HeaderPanel from './Components/HeaderPanel';
import NavigationMenuContainer from './Containers/NavigationMenuContainer';
import AlertDialogPanel from './Containers/AlertDialogPanel';
import LoadingOverlayContainer from './Containers/LoadingOverlayContainer';

import HomeScreen from './Components/Screens/HomeScreen';
import VisualizationContainer from './Containers/VisualizationContainer';
import AboutScreen from './Components/Screens/AboutScreen';

class App extends React.Component {
  render() {
    return (
      <Router>
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
      </Router>
    );
  }
}

export default App;
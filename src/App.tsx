import * as React from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import "./App.scss";
import HeaderPanel from "./Components/HeaderPanel";
import LoadingOverlay from "./Components/LoadingOverlay";
import AlertDialogPanel from "./Containers/AlertDialogPanel";
import LoadingOverlayContainer from "./Containers/LoadingOverlayContainer";
import RouterOutlet from "./Components/RouterOutlet";

export interface AppStateProps {
  isConfigLoaded?: boolean;
  isLoggedIn?: boolean;
}

export interface AppDispatchProps {
  getConfig?: () => void;
  getAccount?: () => void;
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
            <Col xs="12">
              <RouterOutlet />
            </Col>
          </Row>
        </Container>
        <AlertDialogPanel />
      </BrowserRouter>
    );
  }
}

export default App;

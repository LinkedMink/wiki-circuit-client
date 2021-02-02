import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.scss";
import AppContainer from "./AppContainer";
import * as serviceWorker from "./serviceWorker";
import store from "./Store";

require("jquery");
require("bootstrap");
require("bootstrap/dist/css/bootstrap.css");
require("open-iconic/font/css/open-iconic-bootstrap.css");

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from "react-redux";

import { APP_ROUTES } from "./constants";
import Intl from "./containers/Intl";
import Theme from "./containers/Theme";
import SignIn from "./containers/SignIn";
import List from "./components/List";
import Header from "./components/Header";
import store from "./store";

import appStart from "./appStart";

appStart.start();

const App = (): JSX.Element => (
  <Provider store={store}>
    <Intl>
      <Theme>
        <Router>
          <CssBaseline />
          <Header />
          <Switch>
            <Route path={APP_ROUTES.signIn} component={SignIn} />
            <Route path={APP_ROUTES.list} component={List} />
            <Redirect from={APP_ROUTES.base} to={APP_ROUTES.list} />
          </Switch>
        </Router>
      </Theme>
    </Intl>
  </Provider>
);

export default App;

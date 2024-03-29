import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {
  useMediaQuery,
  useTheme,
  CssBaseline,
  StyledEngineProvider,
} from "@mui/material";

import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { PersistGate } from "redux-persist/integration/react";

import { APP_ROUTES } from "./constants";
import Intl from "./components/Intl";
import Theme from "./components/Theme";
import SignIn from "./components/SignIn";
import List from "./components/List";
import Header from "./components/Header";
import store, { persistor } from "./store";

import appStart from "./appStart";

appStart.start();

const App = (): JSX.Element => {
  const theme = useTheme();
  const isMoblie = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StyledEngineProvider injectFirst>
          <Intl>
            <Theme>
              <SnackbarProvider dense={isMoblie} variant="success">
                <Router>
                  <CssBaseline />
                  <Header />
                  <Switch>
                    <Route path={APP_ROUTES.signIn} component={SignIn} />
                    <Route path={APP_ROUTES.list} component={List} />
                    <Redirect from={APP_ROUTES.base} to={APP_ROUTES.allList} />
                  </Switch>
                </Router>
              </SnackbarProvider>
            </Theme>
          </Intl>
        </StyledEngineProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

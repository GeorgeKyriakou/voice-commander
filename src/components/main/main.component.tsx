import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/auth.context";
import { GlobalStyle, theme } from "../../styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "../../utils/protectedRoute";
import { LoginComponent } from "../login/login.component";
import { WebPlayerComponent } from "../web-player/web-player.component";
import { CallbackComponent } from "../callback/callback.component";
import { ThemeProvider } from "styled-components";

interface Props {}
export const MainComponent: React.FC<Props> = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, checkAuthenticated } = authContext;

  useEffect(() => {
    checkAuthenticated();
  }, [isAuthenticated]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <div className="app">
          <div className="main">
            <div className="router-outlet">
              <Switch>
                <ProtectedRoute
                  exact
                  path="/"
                  isAuthenticated={isAuthenticated}
                  component={WebPlayerComponent}
                />
                <ProtectedRoute
                  exact
                  path="/login"
                  isAuthenticated={!sessionStorage.getItem("accessToken")}
                  component={LoginComponent}
                  redirectTo="/"
                />
                <ProtectedRoute
                  path="/callback"
                  isAuthenticated={!sessionStorage.getItem("accessToken")}
                  component={CallbackComponent}
                  redirectTo="/"
                />

                <Route path="/" render={() => <div>404</div>}></Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({
  component,
  isAuthenticated,
  redirectTo = "/login",
  ...componentProperties
}: any) => {
  const routeComponent = (props: any) =>
    isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: `${redirectTo}` }} />
    );
  return <Route {...componentProperties} render={routeComponent} />;
};

import { Redirect, Route } from "react-router-dom";

const RestrictedRoute = ({
  component: Component,
  location,
  isAuthenticated,
  ...rest
}) => {
  return isAuthenticated ? (
    <Route {...rest} exact render={(props) => <Component {...props} />} />
  ) : (
    <Redirect to="/signin" />
  );
};

const UnRestrictedRoute = ({
  component: Component,
  location,
  isAuthenticated,
  ...rest
}) => {
  return isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <Route {...rest} exact render={(props) => <Component {...props} />} />
  );
};

export { RestrictedRoute, UnRestrictedRoute };
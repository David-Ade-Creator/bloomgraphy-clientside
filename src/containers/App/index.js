import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import { IntlProvider } from "react-intl";

import AppLocale from "lngProvider";
import MainApp from "./MainApp";
import SignIn from "../Auth/SigninPage";
import SignUp from "../Auth/SignupPage";
import CircularProgress from "../../components/CircularProgress";
import { getUser } from "../../appRedux/actions";

const RestrictedRoute = ({
  component: Component,
  location,
  authUser,
  ...rest
}) => <Route {...rest} render={(props) => <Component {...props} />} />;

const App = () => {
  const dispatch = useDispatch();
  const { locale } = useSelector(
    ({ settings }) => settings
  );
  const { token, loadingAuthUser, authUser } = useSelector(
    ({ auth }) => auth
  );

  const location = useLocation();
  const match = useRouteMatch();

  useEffect(() => {
    dispatch(getUser(token));
  }, [dispatch, token]);

  const currentAppLocale = AppLocale[locale.locale];

  return loadingAuthUser ? (
    <CircularProgress />
  ) : (
    <ConfigProvider locale={currentAppLocale.antd}>
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <RestrictedRoute
            path={`${match.url}`}
            authUser={authUser}
            location={location}
            component={MainApp}
          />
        </Switch>
      </IntlProvider>
    </ConfigProvider>
  );
};

export default memo(App);

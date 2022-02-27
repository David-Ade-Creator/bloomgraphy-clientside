import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { ConfigProvider } from "antd";
import { IntlProvider } from "react-intl";

import AppLocale from "lngProvider";
import MainApp from "./MainApp";
import SignIn from "../Auth/SigninPage";
import SignUp from "../Auth/SignupPage";
import { getUser } from "../../appRedux/actions";
import { UnRestrictedRoute } from "../../util/authenticate";

const App = () => {
  const dispatch = useDispatch();
  const [isAuthenticated, setUserAuthentication] = useState(false);

  const { locale } = useSelector(({ settings }) => settings);
  const { token, loadingAuthUser, authUser } = useSelector(({ auth }) => auth);
  const match = useRouteMatch();

  useEffect(() => {
    dispatch(getUser(token));
  }, [authUser, dispatch, token]);

  useEffect(() => {
    authUser ? setUserAuthentication(true) : setUserAuthentication(false);
  }, [authUser]);

  const currentAppLocale = AppLocale[locale.locale];

  return (
    <ConfigProvider locale={currentAppLocale.antd}>
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <Switch>
          <UnRestrictedRoute
            path="/signin"
            isAuthenticated={isAuthenticated}
            component={SignIn}
            exact
          />
          <UnRestrictedRoute
            path="/signup"
            isAuthenticated={isAuthenticated}
            component={SignUp}
            exact
          />
          <Route
            path={`${match.url}`}
            render={(props) => (
              <MainApp
                isAuthenticated={isAuthenticated}
                loadingAuthUser={loadingAuthUser}
                {...props}
              />
            )}
          />
        </Switch>
      </IntlProvider>
    </ConfigProvider>
  );
};

export default memo(App);

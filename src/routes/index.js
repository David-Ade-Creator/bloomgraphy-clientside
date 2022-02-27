import React from "react";
import { Route, Switch } from "react-router-dom";
import ChatPage from "./ChatPage";
import HomePage from "./HomePage";
import DetailsPage from "./DetailsPage";
import UploadPage from "./UploadPage";
import UserPage from "./UserPage";
import EditPage from "./UploadPage/editPost";
import {RestrictedRoute} from "../util/authenticate";

const App = ({ match, isAuthenticated }) => {
  return (
    <div className="gx-main-content-wrapper gx-p-0">
      <Switch>
        <Route path={`${match.url}`} component={HomePage} exact />
        <RestrictedRoute
          path={`${match.url}chat/:username?`}
          isAuthenticated={isAuthenticated}
          component={ChatPage}
          exact
        />
        <RestrictedRoute
          path={`${match.url}shot/:id`}
          isAuthenticated={isAuthenticated}
          component={DetailsPage}
          exact
        />
        <RestrictedRoute
          path={`${match.url}upload`}
          isAuthenticated={isAuthenticated}
          component={UploadPage}
          exact
        />
        <RestrictedRoute
          path={`${match.url}editpost/:postId`}
          isAuthenticated={isAuthenticated}
          component={EditPage}
          exact
        />
        <RestrictedRoute
          path={`${match.url}:username`}
          isAuthenticated={isAuthenticated}
          component={UserPage}
          exact
        />
      </Switch>
    </div>
  );
};

export default App;

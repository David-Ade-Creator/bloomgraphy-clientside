import React from "react";
import {Route, Switch} from "react-router-dom";
import ChatPage from "./ChatPage";

import asyncComponent from "util/asyncComponent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper gx-p-0">
    <Switch>
      <Route path={`${match.url}home`} component={asyncComponent(() => import('./HomePage'))} exact/>
      <Route path={`${match.url}chat`} component={ChatPage} exact/>
      <Route path={`${match.url}shot/:id`} component={asyncComponent(() => import('./DetailsPage'))} exact/>
      <Route path={`${match.url}upload`} component={asyncComponent(() => import('./UploadPage'))} exact/>
      <Route path={`${match.url}editpost/:postId`} component={asyncComponent(() => import('./UploadPage'))} exact/>
      <Route path={`${match.url}saved`} component={asyncComponent(() => import('./SavedShotPage'))} exact/>
      <Route path={`${match.url}:username`} component={asyncComponent(() => import('./UserPage'))} exact/>
      
    </Switch>
  </div>
);

export default App;
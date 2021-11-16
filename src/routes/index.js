import React from "react";
import {Route, Switch} from "react-router-dom";
import ChatPage from "./ChatPage";
import HomePage from "./HomePage";
import DetailsPage from "./DetailsPage";
import UploadPage from "./UploadPage";
import SavedShotPage from "./SavedShotPage";
import UserPage from "./UserPage";
import EditPage from "./UploadPage/editPost";

const App = ({match}) => (
  <div className="gx-main-content-wrapper gx-p-0">
    <Switch>
      <Route path={`${match.url}`} component={HomePage} exact/>
      <Route path={`${match.url}chat/:username?`} component={ChatPage} exact/>
      <Route path={`${match.url}shot/:id`} component={DetailsPage} exact/>
      <Route path={`${match.url}upload`} component={UploadPage} exact/>
      <Route path={`${match.url}editpost/:postId`} component={EditPage} exact/>
      <Route path={`${match.url}saved`} component={SavedShotPage} exact/>
      <Route path={`${match.url}:username`} component={UserPage} exact/>
      
    </Switch>
  </div>
);

export default App;
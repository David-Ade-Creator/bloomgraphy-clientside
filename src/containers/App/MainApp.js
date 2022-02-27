import React from "react";
import { Layout } from "antd";
import AboveHeader from "../Topbar/AboveHeader/index";
import App from "routes/index";
import { useRouteMatch } from "react-router-dom";

const { Content } = Layout;

const MainApp = ({isAuthenticated}) => {
  const match = useRouteMatch();

  return (
    <Layout className="gx-app-layout">
      <AboveHeader />
      <Layout>
        <Content className="gx-layout-content">
          <App match={match} isAuthenticated={isAuthenticated} />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainApp;

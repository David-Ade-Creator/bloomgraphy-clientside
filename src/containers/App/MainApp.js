import React from "react";
import { Layout } from "antd";
import AboveHeader from "../Topbar/AboveHeader/index";
import App from "routes/index";
import { useRouteMatch } from "react-router-dom";

const { Content } = Layout;

const MainApp = () => {
  const match = useRouteMatch();

  return (
    <Layout className="gx-app-layout">
      <Layout>
        <AboveHeader />
        <Content className={`gx-layout-content`}>
          {/* this is coming from the index page in routes folder, used to identify present route url and navigate to route */}
          <App match={match} />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainApp;

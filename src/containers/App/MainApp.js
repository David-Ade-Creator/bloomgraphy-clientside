import React from "react";
import { Layout } from "antd";
import AboveHeader from "../Topbar/AboveHeader/index";
import { footerText } from "util/config";
import App from "routes/index";
import { useSelector } from "react-redux";
import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
} from "../../constants/ThemeSetting";
import { useRouteMatch } from "react-router-dom";

const { Content, Footer } = Layout;

const MainApp = () => {
  const { navStyle } = useSelector(({ settings }) => settings);
  const match = useRouteMatch();

  const getContainerClass = (navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_DARK_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_BELOW_HEADER:
        return "gx-container-wrap";
      case NAV_STYLE_ABOVE_HEADER:
        return "gx-container-wrap";
      default:
        return "";
    }
  };

  return (
    <Layout className="gx-app-layout">
      {/* <Sidebar/> */}
      <Layout>
        <AboveHeader />
        <Content
          className={`gx-layout-content ${getContainerClass(navStyle)} `}
        >
          <App match={match} />
          {/* <Footer>
            <div className="gx-layout-footer-content">{footerText}</div>
          </Footer> */}
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainApp;

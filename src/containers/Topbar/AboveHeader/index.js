import React from "react";
import { Layout } from "antd";
import "./style.less";
import UserInfo from "components/UserInfo";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const { Header } = Layout;


const AboveHeader = () => {
  const authUser = useSelector(({ auth }) => auth.authUser);

  return (
    <div className="header gx-p-0">
      <Header className="customheader" >
        <div className="" style={{width:"100%"}}>
          <div className="gx-header-horizontal-main-flex">
            <Link
              to="/"
              className="gx-d-block gx-d-lg-none gx-pointer gx-mr-xs-3 gx-pt-xs-1 gx-w-logo"
              style={{ color: "white" }}
            >
             <h5 style={{ color: "white" }}>Bloomgraphy</h5>
            </Link>
            <Link
              to="/"
              className="gx-d-none gx-d-lg-block gx-pointer  gx-logo"
            >
              <h3 style={{ color: "white" }}>Bloomgraphy</h3>
            </Link>

            <ul className="gx-header-notifications gx-ml-auto">
             
              {authUser !== null ? (
                <li className="gx-user-nav gx-mt-2 gx-pt-1">
                  <UserInfo />
                </li>
              ) : (
                <>
                  <li
                    className=""
                    style={{
                      color: "orange",
                      fontSize: "15px",
                      cursor: "pointer",
                    }}
                  >
                    <Link to="signin" style={{ color: "orange" }}>
                      Login
                    </Link>
                  </li>
                  <li
                    className=""
                    style={{
                      color: "orange",
                      fontSize: "15px",
                      cursor: "pointer",
                    }}
                  >
                    <Link to="signup" style={{ color: "orange" }}>
                      Signup
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </Header>
    </div>
  );
};

export default AboveHeader;

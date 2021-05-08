import React, { useState } from "react";
import { Button, Dropdown, Layout, Menu, message, Popover, Select } from "antd";
import "./style.less";

import SearchBox from "components/SearchBox";
import UserInfo from "components/UserInfo";
import { Link } from "react-router-dom";
import DownOutlined from "@ant-design/icons/lib/icons/DownOutlined";
import { useSelector } from "react-redux";

const { Header } = Layout;

const Option = Select.Option;
const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="photos">Photos</Menu.Item>
  </Menu>
);

function handleMenuClick() {
  message.info("Click on menu item.");
}

function handleChange(value) {
  console.log(`selected ${value}`);
}

const AboveHeader = () => {
  const [searchText, setSearchText] = useState("");

  const updateSearchChatUser = (evt) => {
    setSearchText(evt.target.value);
  };

  return (
    <div className="header">
      <Header className="customheader">
        <div className="gx-container  gx-p-0">
          <div className="gx-header-horizontal-main-flex">
            <Link
              to="/"
              className="gx-d-block gx-d-lg-none gx-pointer gx-mr-xs-3 gx-pt-xs-1 gx-w-logo"
              style={{ color: "white" }}
            >
              Bloomgraphy
            </Link>
            <Link
              to="/"
              className="gx-d-none gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo"
            >
              <h3 style={{ color: "white" }}>Bloomgraphy</h3>
            </Link>
            <div className="gx-header-search gx-d-none gx-d-lg-flex">
              <SearchBox
                styleName="gx-lt-icon-search-bar-lg"
                placeholder="Search in bloomgraphy..."
                onChange={updateSearchChatUser}
                value={searchText}
              />

              <Select
                defaultValue="photos"
                style={{ width: 120 }}
                onChange={handleChange}
              >
                <Option value="photos">Photos</Option>
              </Select>
            </div>

            <ul className="gx-header-notifications gx-ml-auto">
              <li className="gx-notify gx-notify-search gx-d-inline-block gx-d-lg-none">
                <Popover
                  overlayClassName="gx-popover-horizantal"
                  placement="bottomRight"
                  content={
                    <div className="gx-d-flex">
                      <Dropdown overlay={menu}>
                        <Button>
                          Category <DownOutlined />
                        </Button>
                      </Dropdown>
                      <SearchBox
                        styleName="gx-popover-search-bar"
                        placeholder="Search in bloomgraphy..."
                        onChange={updateSearchChatUser}
                        value={searchText}
                        style={{color:"whites"}}
                      />
                    </div>
                  }
                  trigger="click"
                >
                  <span className="gx-pointer gx-d-block">
                    <i className="icon icon-search-new" />
                  </span>
                </Popover>
              </li>
              <li
                className=""
                style={{ color: "orange", fontSize: "15px", cursor: "pointer" }}
              >
                <Link to="signin" style={{ color: "orange" }}>
                  Login
                </Link>
              </li>
              <li
                className=""
                style={{ color: "orange", fontSize: "15px", cursor: "pointer" }}
              >
                <Link to="signup" style={{ color: "orange" }}>
                  Signup
                </Link>
              </li>
              <li className="gx-user-nav">
                <UserInfo />
              </li>
            </ul>
          </div>
        </div>
      </Header>
    </div>
  );
};

export default AboveHeader;

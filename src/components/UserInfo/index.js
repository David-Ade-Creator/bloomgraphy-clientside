import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Popover} from "antd";
import {userSignOut} from "appRedux/actions/Auth";
import { Link } from "react-router-dom";

const UserInfo = () => {
  const authUser = useSelector(({auth}) => auth.authUser);

  const dispatch = useDispatch();

  const userMenuOptions = (
    <ul className="gx-user-popover">
      <Link to={`/${authUser.username}`}>
      <li>My Account</li>
      </Link>
      <li onClick={() => dispatch(userSignOut())}>Logout
      </li>
    </ul>
  );

  return (
    <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={userMenuOptions} trigger="click">
      {authUser.username ? <Avatar  className="gx-avatar gx-pointer" >{authUser.username.substring(0,2).toUpperCase()}</Avatar> : <Avatar src={"https://via.placeholder.com/150"} className="gx-avatar gx-pointer" alt=""/>}
    </Popover>
  );
};

export default UserInfo;

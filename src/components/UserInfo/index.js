import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Popover, Tag } from "antd";
import { userSignOut } from "appRedux/actions/Auth";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "../../graphql/queries";

const UserInfo = () => {
  const authUser = useSelector(({ auth }) => auth.authUser);
  const username = authUser.username
  const [user,setUser] = React.useState(null)

  const dispatch = useDispatch();

  const { data: userData } = useQuery(GET_USER_PROFILE, {
    variables: { username },
    onCompleted:()=>{
      setUser(userData?.getProfile)
    }
  });

  const userMenuOptions = (
    <ul className="gx-user-popover">
      <Link to={`/${authUser.username}`}>
        <li>My Account</li>
      </Link>
      <li onClick={() => dispatch(userSignOut())}>Logout</li>
    </ul>
  );

  return (
    <Popover
      overlayClassName="gx-popover-horizantal"
      placement="bottomRight"
      content={userMenuOptions}
      trigger="click"
    >
      {user ? <h5 style={{color:"white",cursor:"pointer"}}>{"Hello " + authUser.username}<Tag className="gx-ml-2" color="orange">?</Tag></h5>: ""}
    </Popover>
  );
};

export default UserInfo;

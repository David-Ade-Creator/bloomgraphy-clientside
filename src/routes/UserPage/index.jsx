import React from "react";
import { Col, Row } from "antd";
import { Tabs } from "antd";
import CircularProgress from "components/CircularProgress";
import { useLazyQuery, useQuery } from "@apollo/client";
import { FETCH_USER_POSTS, GET_USER_PROFILE } from "../../graphql/queries";
import { useSelector } from "react-redux";
import { ProfileTab } from "./tabs/profiletab";
import PostTab from "./tabs/posttab";

const { TabPane } = Tabs;

function UserPage(props) {
  const username = props.match.params.username;
  const [userProfile, setUserProfile] = React.useState(undefined);
  const [userPosts, setUserPosts] = React.useState(undefined);
  const [isEditOpen, setEdit] = React.useState(false);

  const toggleEdit = () => {
    setEdit(!isEditOpen);
  };

  const authUser = useSelector(({ auth }) => auth.authUser);

  React.useEffect(() => {
    if (authUser == null) {
      props.history.push("/signin");
    }
  }, [authUser, props.history]);

  const { data: userData } = useQuery(GET_USER_PROFILE, {
    variables: { username },
  });

  const { data: postDatas } = useQuery(FETCH_USER_POSTS, {
    fetchPolicy: "network-only",
    variables: { username },
    onCompleted: () => {
      setUserPosts(postDatas?.getUserPost);
    },
  });

  const [updateCallAfterDelete, { data: refreshedData }] = useLazyQuery(
    FETCH_USER_POSTS,
    {
      fetchPolicy: "network-only",
      variables: { username },
      onCompleted: () => {
        setUserPosts(refreshedData?.getUserPost);
      },
    }
  );

  React.useEffect(() => {
    setUserProfile(userData?.getProfile);
  }, [userData]);

  return !userProfile && !userPosts ? (
    <CircularProgress />
  ) : (
    <Row style={{ background: "white", minHeight: "30vh" }} className="gx-p-5">
      <Col lg={24} md={24} sm={24} xs={24}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Shots" key="1">
            <PostTab
              userPosts={userPosts}
              toggleEdit={toggleEdit}
              updateCallAfterDelete={updateCallAfterDelete}
            />
          </TabPane>
          <TabPane tab="About" key="2">
            <ProfileTab
              userProfile={userProfile}
              authUser={authUser}
              username={username}
              userPosts={userPosts}
            />
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
}

export default UserPage;

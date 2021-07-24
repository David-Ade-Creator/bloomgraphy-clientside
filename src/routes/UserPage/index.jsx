import React from "react";
import { Avatar, Button, Col, Image, message, Row } from "antd";
import { Tabs } from "antd";
import CircularProgress from "components/CircularProgress";
import ListCard from "../../components/ListCard";
import { gql, useMutation, useQuery } from "@apollo/client";
import UserForm from "./form";
import { FETCH_POSTS_QUERY, GET_USER_PROFILE } from "../../graphql/queries";
import { useSelector } from "react-redux";

const { TabPane } = Tabs;

function UserPage(props) {
  const username = props.match.params.username;
  const [userProfile, setUserProfile] = React.useState(undefined);
  const [userPosts, setUserPosts] = React.useState(undefined);
  const [isEditOpen, setEdit] = React.useState(false);

  const authUser = useSelector(({ auth }) => auth.authUser);

  React.useEffect(() => {
    if (authUser == null) {
      props.history.push("/signin");
    }
  }, [authUser, props.history]);

  const toggleEdit = () => {
    setEdit(!isEditOpen);
  };

  const { data: userData } = useQuery(GET_USER_PROFILE, {
    variables: { username },
  });

  const [updateProfile, { loading: submittingupdate }] = useMutation(
    UPDATE_USER_PROFILE,
    {
      onCompleted: (data) => {
        message.success("Profile updated");
        setEdit(false);
      },
    }
  );

  const { data: postDatas } = useQuery(FETCH_POSTS_QUERY, {
    variables: { username },
    onCompleted: () => {
      const requiredPost = postDatas?.getPosts?.filter(
        (post) => post.username === username
      );
      setUserPosts(requiredPost);
    },
  });

  React.useEffect(() => {
    setUserProfile(userData?.getProfile);
  }, [userData]);

  const onFinish = (values) => {
    updateProfile({ variables: values });
  };

  return !userProfile && !userPosts ? (
    <CircularProgress />
  ) : (
    <Row style={{ background: "white", minHeight: "30vh" }} className="gx-p-5">
      <Col lg={24}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Shots" key="1">
            <Row style={{ minHeight: "66vh" }}>
              {userPosts ? (
                userPosts.map((singledata, i) => {
                  return (
                    <ListCard
                      singledata={singledata}
                      key={i}
                      toggleEdit={toggleEdit}
                    />
                  );
                })
              ) : (
                <>No Posts</>
              )}
            </Row>
          </TabPane>
          <TabPane tab="About" key="2">
            <Row className="gx-p-3" style={{ minHeight: "66.5vh" }}>
              <Col lg={14}>
                <Row justify="center gx-mb-3">
                  <Col
                    lg={20}
                    md={20}
                    sm={20}
                    xs={20}
                    style={{ textAlign: "center" }}
                    className="gx-mb-4"
                  >
                    {userProfile?.photo ? (
                      <Avatar
                        size={64}
                        src={<Image src={userProfile?.photo} />}
                      />
                    ) : (
                      <Avatar size={64}>
                        {userProfile?.firstName.substring(0, 2).toUpperCase()}
                      </Avatar>
                    )}
                  </Col>
                  <Col
                    llg={20}
                    md={20}
                    sm={20}
                    xs={20}
                    style={{ textAlign: "center" }}
                    className="gx-mb-4"
                  >
                    {userProfile?.firstName + " " + userProfile?.lastName}
                  </Col>
                  <Col
                    lg={20}
                    md={20}
                    sm={20}
                    xs={20}
                    style={{ textAlign: "center" }}
                    className="gx-mb-3"
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <span style={{ textAlign: "center" }}>
                        {userPosts?.length}{" "}
                        {userPosts?.length > 1 ? "Shots" : "Shot"} uploaded
                      </span>
                      {authUser.username === username && (
                        <Button type="primary" onClick={toggleEdit}>
                          Edit Profile
                        </Button>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row justify="center">
                  <Col lg={20} md={24} sm={24} xs={24}>
                    <h2>Bio</h2>
                    <p>
                      {userProfile?.bio
                        ? userProfile.bio
                        : "Write something in your bio"}
                    </p>
                  </Col>
                  <Col lg={20} md={24} sm={24} xs={24}>
                    <h5>
                      Personal Website :{" "}
                      <strong>
                        {userProfile?.personalWebsite
                          ? userProfile.personalWebsite
                          : "Update personal website"}
                      </strong>
                    </h5>
                  </Col>
                  <Col lg={20} md={24} sm={24} xs={24}>
                    <h5>
                      Portfolio Url :{" "}
                      <strong>
                        {userProfile?.portfolioUrl
                          ? userProfile.portfolioUrl
                          : "Update your portfolio url"}
                      </strong>
                    </h5>
                  </Col>
                </Row>
              </Col>
              <Col lg={10} md={24} sm={24} xs={24} className="gx-mt-3">
                <Row justify="center">
                  <Col lg={20} md={24} sm={24} xs={24}>
                    <h2>Location</h2>
                    <p>
                      {userProfile?.location
                        ? userProfile.location
                        : "Add your location"}
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <UserForm
              isEditOpen={isEditOpen}
              toggleEdit={toggleEdit}
              userProfile={userProfile}
              onFinish={onFinish}
              submittingupdate={submittingupdate}
            />
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
}

const UPDATE_USER_PROFILE = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $bio: String
    $location: String
    $portfolioUrl: String
    $personalWebsite: String
    $photo: String
  ) {
    editProfile(
      photo: $photo
      firstName: $firstName
      lastName: $lastName
      bio: $bio
      location: $location
      portfolioUrl: $portfolioUrl
      personalWebsite: $personalWebsite
    ) {
      id
      bio
      personalWebsite
      photo
      portfolioUrl
      firstName
      lastName
      location
    }
  }
`;

export default UserPage;

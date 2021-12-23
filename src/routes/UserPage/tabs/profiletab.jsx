import React from "react";
import { Avatar, Button, Col, Image, message, Row } from "antd";
import { Space } from "antd";
import {Link} from "react-router-dom";
import { useMutation } from "@apollo/client";
import UserForm from "../form";
import { UPDATE_USER_PROFILE } from "graphql/mutations";

 

 export const ProfileTab=({userProfile,userPosts, username, authUser})=>{
    const [isEditOpen, setEdit] = React.useState(false);

    const toggleEdit = () => {
        setEdit(!isEditOpen);
      };

      const [updateProfile, { loading: submittingupdate }] = useMutation(
        UPDATE_USER_PROFILE,
        {
          onCompleted: (data) => {
            message.success("Profile updated");
            setEdit(false);
          },
        }
      );

      const onFinish = (values) => {
        updateProfile({ variables: values });
      };


     return (
        <Row
        className="gx-p-0"
        style={{
          minHeight: "66.5vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Col lg={14}>
          <Row justify="center gx-mb-3">
            <Col
              lg={20}
              md={20}
              sm={24}
              xs={24}
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
              sm={24}
              xs={24}
              style={{ textAlign: "center" }}
              className="gx-mb-4"
            >
              {userProfile?.firstName + " " + userProfile?.lastName}
            </Col>
            <Col
              lg={20}
              md={20}
              sm={24}
              xs={24}
              style={{ textAlign: "center" }}
              className="gx-mb-3"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span style={{ textAlign: "center" }}>
                  {userPosts?.length}{" "}
                  {userPosts?.length > 1 ? "Shots" : "Shot"} uploaded
                </span>
              </div>
            </Col>
            <Col
              lg={20}
              md={20}
              sm={24}
              xs={24}
              style={{ textAlign: "center" }}
              className="gx-mb-3"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Space> 
                {authUser.username === username && (
                  <Button type="primary" onClick={toggleEdit}>
                    Edit Profile
                  </Button>
                )}
                {authUser.username === username ? 
                  <Link to="/chat">
                  <Button type="ghost">
                    Chat
                  </Button>
                  </Link> :
                  <Link to={`/chat/${username}`}>
                  <Button type="ghost">
                    Chat
                  </Button>
                  </Link>
                }
                </Space>
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
        <UserForm
              isEditOpen={isEditOpen}
              toggleEdit={toggleEdit}
              userProfile={userProfile}
              onFinish={onFinish}
              submittingupdate={submittingupdate}
            />
      </Row>
     )
 }
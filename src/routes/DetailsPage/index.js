/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Alert, Avatar, Button, Card, Carousel, Col, Row } from "antd";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import PostList from "components/wall/PostList";
import "./style.less";
import LikeButton from "../../components/Likebutton";
import { useSelector } from "react-redux";
import CircularProgress from "components/CircularProgress";
import CustomScrollbars from "util/CustomScrollbars";
import Modal from "antd/lib/modal/Modal";

function DetailsPage(props) {
  const postId = props.match.params.id;
  const authUser = useSelector(({ auth }) => auth.authUser);
  const [post, setPost] = React.useState(null);
  const [askBar,setAskBar] = React.useState(false);

  const toggleAskBar=()=>{
    setAskBar(!askBar)
  }

  React.useEffect(() => {
    if (authUser == null) {
      props.history.push("/signin");
    }
  }, [authUser]);
  const { loading, data } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
  });

  React.useEffect(() => {
    !loading && data && setPost(data?.getPost);
  }, [data, loading]);

  return !loading && post !== null ? (
    <div>
      <Modal visible={askBar} onCancel={toggleAskBar} closable={false} footer={null} zIndex={1000}>
        <Alert type="warning" message="Make sure to contact photographer before booking a time" />
        <Button type="primary">Select and Book and appointment with me</Button>
        <Link to={`/chat/${post.username}`}>
        <Button type="primary">Let's have a conversation about your service</Button>
        </Link>
      </Modal>
      <Row justify="center" className="gx-pt-4 gx-pb-4">
        <Col lg={15} md={24} sm={24} xs={24}>
          <Row className="gx-p-3" justify="space-between">
            <Col lg={12} md={24} sm={24} xs={24}>
              <span>
                <Link to={`/${post.username}`}>
                  <h4>
                    <Avatar className="gx-mr-2">
                      {post.username.substring(0, 2).toUpperCase()}
                    </Avatar>
                    {post.username}
                  </h4>
                </Link>
                <p style={{marginTop:"1rem"}}>
                  Freelancing photographer .{" "}
                  {authUser.username !== post.username && <span style={{ color: "red",cursor:"pointer" }} onClick={toggleAskBar}>
                    <strong>Hire Me</strong>
                  </span>}
                </p>
              </span>
            </Col>
            <Col lg={12} style={{ textAlign: "right" }}>
            <span>
            <Button type="link" className="gx-fs-md gx-pointer gx-mr-3 gx-text-black gx-p-0">Leave a Message</Button>
              </span>
              <span>
                <LikeButton post={post} user={authUser} />
              </span>
            </Col>
          </Row>
          <Row justify="center">
            <Col lg={24} md={24} sm={24} xs={24}>
              <Card style={{ position: "relative", width: "100%" }}>
                <Carousel effect="fade">
                  {post?.images.map((singleImage, i) => (
                    <div key={i}>
                      <img
                        alt="example"
                        className="carousel-image"
                        src={singleImage.url}
                      />
                    </div>
                  ))}
                </Carousel>
              </Card>
            </Col>
          </Row>
          <Row justify="center" className="gx-p-3 gx-mb-4">
            <Col lg={24}>{post?.body}</Col>
          </Row>
        </Col>
        <Col
          lg={8}
          md={24}
          sm={24}
          xs={22}
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
          className="gx-pl-4"
        >
          <div className="gx-p-2 feedback">
          <CustomScrollbars >
          <PostList post={post} user={authUser} />
      </CustomScrollbars>   
          </div>
        </Col>
      </Row>
    </div>
  ) : (
    <CircularProgress />
  );
}

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      images{
    uid
    name
    url
  }
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default DetailsPage;

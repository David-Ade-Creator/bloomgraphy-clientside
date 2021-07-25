/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Avatar, Card, Carousel, Col, Row } from "antd";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import PostList from "components/wall/PostList";
import "./style.less";
import LikeButton from "../../components/Likebutton";
import { useSelector } from "react-redux";
import CircularProgress from "components/CircularProgress";

function DetailsPage(props) {
  const postId = props.match.params.id;
  const authUser = useSelector(({ auth }) => auth.authUser);
  const [post, setPost] = React.useState(null);

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
    <div style={{ minHeight: "100vh" }}>
      <Row justify="center" className="gx-pt-4 gx-pb-4">
        <Col lg={15} md={24} sm={24} xs={24} style={{ minHeight: "79.7vh" }}>
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
                <p>
                  Freelancing photographer .{" "}
                  <span style={{ color: "red" }}>
                    <strong>Hire Me</strong>
                  </span>
                </p>
              </span>
            </Col>
            <Col lg={12} style={{ textAlign: "right" }}>
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
                        width="100%"
                        height="500px"
                        alt="example"
                        style={{
                          objectFit: "cover",
                          objectPosition: "50% 50%",
                        }}
                        src={singleImage}
                      />
                    </div>
                  ))}
                </Carousel>
              </Card>
            </Col>
          </Row>
          <Row justify="center" className="gx-p-3">
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
        >
          <div className="gx-p-2 feedback">
            <PostList post={post} user={authUser} />
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
      images
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

import React from "react";
import { Button, Col, message } from "antd";
import { Link, useHistory } from "react-router-dom";
import confirm from "antd/lib/modal/confirm";
import { useSelector } from "react-redux";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import LikeButton from "../Likebutton";
import { FETCH_POSTS_QUERY } from "../../graphql/queries";
import SaveButton from "../SaveButton";

function ListCard({ singledata, isHomePage }) {
  const history = useHistory();
  const authUser = useSelector(({ auth }) => auth.authUser);

  const [deletePost] = useMutation(DELETE_POST_QUERY, {
    update: async (proxy) => {
      const data = await proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      data.getPosts = data?.getPosts.filter((p) => p.id !== singledata.id);
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      message.success("post deleted");
      history.push(`/${singledata.username}`);
    },
    variables: { postId: singledata.id },
  });
  function showDeleteConfirm() {
    confirm({
      title: "Are you sure you want to delete this post?",
      // icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deletePost();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  return (
    <Col
      lg={6}
      md={12}
      sm={24}
      xs={24}
      style={{ cursor: "pointer", position: "relative" }}
      key={singledata.id}
      className="gx-pb-2 gx-m-0"
    >
      <Link to={`/shot/${singledata.id}`}>
        <div style={{ position: "relative" }}>
          <img
            src={singledata.images[0]}
            alt="yes"
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </div>
      </Link>
      {!isHomePage && authUser?.username === singledata?.username && (
        <div
          className="gx-p-1"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Link to={`/editpost/:${singledata.id}`}>
            <Button type="dashed">Edit</Button>
          </Link>
          <Button type="danger" onClick={showDeleteConfirm}>
            Delete
          </Button>
        </div>
      )}
      {isHomePage && (
        <div
          className="gx-pt-1"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <SaveButton post={singledata} user={authUser} />
          <LikeButton post={singledata} user={authUser} />
        </div>
      )}
    </Col>
  );
}

const DELETE_POST_QUERY = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
      id
    }
  }
`;

export default ListCard;

import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Avatar, Button, Card, Popover } from "antd";
import Moment from "react-moment";
import { useSelector } from "react-redux";

const PostItem = (props) => {
  const { comment, postId } = props;
  const authUser = useSelector(({ auth }) => auth.authUser);

  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    update: (proxy) => {},
  });

  const deleteSelectedComment = (commentId) => {
    deleteComment({ variables: { postId, commentId } });
  };

  const content = (commentId) => {
    return (
      <div style={{ width: "100px", height: "auto", borderRadius:"0" }}>
        <span onClick={() => deleteSelectedComment(commentId)} style={{cursor:"pointer"}}>Delete</span>
      </div>
    );
  };

  return (
    <Card className="gx-card" style={{borderRadius:"0"}}>
     {comment.username === authUser.username && <Popover
        placement="bottomRight"
        content={() => content(comment.id)}
        trigger="click"
      >
        <Button type="link" style={{ float: "right" }}>
          {" "}
          . . .
        </Button>
      </Popover>}
      <div className="gx-wall-content">
        <div className="gx-media gx-wall-user-info gx-flex-nowrap gx-align-items-center">
          {/* <Avatar className="gx-mr-3 gx-mb-2 gx-size-50" src= /> */}
          <Avatar className="gx-mr-3 gx-mb-2 gx-size-50">
            {comment.username.substring(0, 1)}
          </Avatar>
          <div className="gx-media-body">
            <h5 className="gx-wall-user-title">{comment.username}</h5>
            <p style={{ fontSize: "12px" }}>
              <Moment fromNow>{comment.createdAt}</Moment>
            </p>
          </div>
        </div>
        <p>{comment.body}</p>
      </div>
    </Card>
  );
};

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: String!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default PostItem;

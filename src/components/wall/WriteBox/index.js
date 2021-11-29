import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Avatar, Button, Card, Divider, Input } from "antd";
import { GET_USER_PROFILE } from "../../../graphql/queries";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/react-hooks";

const { TextArea } = Input;

const WriteBox = (props) => {
  const { post} = props;
  const authUser = useSelector(({ auth }) => auth.authUser);
  const [userDetails, setUserDetails] = React.useState(undefined);
  const { data: userData } = useQuery(GET_USER_PROFILE, {
    fetchPolicy: "network-only",
    variables: { username : authUser.username },
    onCompleted:()=>{
      setUserDetails(userData?.getProfile);
    }
  });
 
  const [commentText, setCommentText] = useState("");

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update: () => {
      setCommentText("");
    },
    variables: { postId: post.id, body: commentText },
  });

  const onChange = (e) => {
    setCommentText(e.target.value);
  };

  return (
    <Card className="gx-card" style={{borderRadius:"0"}}>
      <div className="gx-media gx-mb-2">
        {userDetails && userDetails.photo ? <Avatar className="gx-size-50 gx-mr-3" src={userDetails?.photo} /> : <Avatar className="gx-size-50 gx-mr-3">{userDetails?.username?.substring(0,2).toUpperCase()}</Avatar> }
        
        <div className="gx-media-body">
          <TextArea
            className="gx-border-0"
            id="exampleTextarea"
            value={commentText}
            multiline="true"
            rows={4}
            onChange={(event) => onChange(event)}
            placeholder="Leave feedbacks"
            margin="none"
          />
        </div>
      </div>

      <Divider />

      <div className="ant-row-flex">
        <Button
          type="primary"
          size="small"
          className="gx-ml-auto gx-mb-0"
          onClick={submitComment}
          disabled={!userDetails}
        >
          SEND
        </Button>
      </div>
    </Card>
  );
};

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

export default WriteBox;

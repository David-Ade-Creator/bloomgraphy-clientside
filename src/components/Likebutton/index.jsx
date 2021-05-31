import React from "react";
import { Button } from "antd";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";

const LikeButton = (props) => {
  const { post, user } = props;
  const [liked, setLiked] = React.useState(false);

  React.useEffect(() => {
    if (user && post.likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [post.likes, user]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: post.id },
  });

  const LikeButton = user ? (
    <Button
      type="link"
      className="gx-fs-sm gx-pointer gx-mr-3 gx-text-grey"
      onClick={likePost}
    >
      {liked ? (
        <i
          className="icon icon-like gx-fs-lg gx-mr-2 gx-d-inline-flex gx-vertical-align-middle"
          style={{ color: "blue" }}
        />
      ) : (
        <i className="icon icon-like-o gx-fs-lg gx-mr-2 gx-d-inline-flex gx-vertical-align-middle" />
      )}
      <span className="gx-d-inline-flex gx-vertical-align-middle">
        {post.likeCount > 0 ? post.likeCount + " Likes" : "Likes"}
      </span>
    </Button>
  ) : (
    <Link to="/signin">
      <Button type="link" className="gx-fs-sm gx-pointer gx-mr-3 gx-text-grey">
        {liked ? (
          <i
            className="icon icon-like gx-fs-lg gx-mr-2 gx-d-inline-flex gx-vertical-align-middle"
            style={{ color: "blue" }}
          />
        ) : (
          <i className="icon icon-like-o gx-fs-lg gx-mr-2 gx-d-inline-flex gx-vertical-align-middle" />
        )}
        <span className="gx-d-inline-flex gx-vertical-align-middle">
          {post.likeCount > 0 ? post.likeCount + " Likes" : "Likes"}
        </span>
      </Button>
    </Link>
  );

  return <span className="gx-mt-0">{LikeButton}</span>;
};

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;

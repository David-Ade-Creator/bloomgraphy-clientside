import React from "react";
import PostItem from "./PostItem";
import WriteBox from "../../../components/wall/WriteBox/index";

const PostList = (props) => {
  const { post, user } = props;
  console.log(post)

  return (
    <>
      <WriteBox user={user} post={post} />
      {post.comments.map((comment) => {
        return (
          <PostItem key={comment.id} index={comment.id} comment={comment} postId={post.id}/>
        );
      })}
    </>
  );
};

export default PostList;

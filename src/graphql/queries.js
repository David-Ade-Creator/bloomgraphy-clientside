import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
{
  getPosts{
   id
  body
  username
  images
  likes{
    id
    username
  }
  likeCount
  commentCount
  }
}
`;


export const FETCH_USER_POSTS = gql`
  query {
    getUserPost(username: "stan__dave") {
      id
      body
      createdAt
      username
      images
      comments {
        id
        username
      }
      likes {
        id
        username
      }
      likeCount
      commentCount
    }
  }
`;
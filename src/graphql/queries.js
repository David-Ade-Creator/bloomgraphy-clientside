import gql from "graphql-tag";


export const GET_USER_PROFILE = gql`
  query($username: String!) {
    getProfile(username: $username) {
      id
      photo
      firstName
      lastName
      bio
      location
      personalWebsite
      portfolioUrl
    }
  }
`;

export const FETCH_POSTS_QUERY = gql`
{
  getPosts{
   id
  body
  username
  images{
    uid
    name
    url
  }
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
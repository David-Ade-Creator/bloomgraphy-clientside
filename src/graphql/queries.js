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
      username
    }
  }
`;

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      images {
        uid
        name
        url
      }
      likes {
        id
        username
      }
      likeCount
      commentCount
      owner {
        email
        firstName
        lastName
        username
        photo
      }
    }
  }
`;

export const FETCH_USER_POSTS = gql`
  query($username: String!) {
    getUserPost(username: $username) {
      id
      body
      createdAt
      images {
        uid
        name
        url
      }
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
      owner {
        email
        firstName
        lastName
        username
      }
    }
  }
`;

export const GET_CHAT_MEMBERS = gql`
  query {
    getChatUsers {
      id
      username
      firstName
      lastName
      lastmessage
      photo
    }
  }
`;

export const GET_MESSAGES = gql`
  query($recipient: String!) {
    getMessages(recipient: $recipient) {
      id
      content
      createdAt
      sender{
        id
        username
        firstName
        lastName
      }
      receiver{
        id
        username
        firstName
        lastName
      }
    }
  }
`;

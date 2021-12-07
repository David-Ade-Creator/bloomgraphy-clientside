import gql from "graphql-tag";

export const GET_SIGNED_URL = gql`
  mutation($filename: String!, $filetype: String!) {
    signS3(filename: $filename, filetype: $filetype) {
      url
    }
  }
`;

export const CREATE_POST = gql`
  mutation(
    $body: String!
    $title: String!
    $type: String!
    $images: [ImageInput]
  ) {
    createPost(body: $body, title: $title, type: $type, images: $images) {
      body
      createdAt
      id
      images {
        uid
        url
        name
      }

      type
      title
    }
  }
`;

export const EDIT_POST = gql`
  mutation(
    $id: ID!
    $body: String!
    $title: String!
    $type: String!
    $images: [ImageInput]
  ) {
    editPost(
      id: $id
      body: $body
      title: $title
      type: $type
      images: $images
    ) {
      body
      createdAt
      id
      images {
        uid
        url
        name
      }
      username
      type
      title
    }
  }
`;


export const UPDATE_USER_PROFILE = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $bio: String
    $location: String
    $portfolioUrl: String
    $personalWebsite: String
    $photo: String
  ) {
    editProfile(
      photo: $photo
      firstName: $firstName
      lastName: $lastName
      bio: $bio
      location: $location
      portfolioUrl: $portfolioUrl
      personalWebsite: $personalWebsite
    ) {
      id
      bio
      personalWebsite
      photo
      portfolioUrl
      firstName
      lastName
      location
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation($content: String!, $receiverId: String!) {
    sendMessage(content: $content, receiverId: $receiverId) {
      id
      content
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

export const DELETE_POST_QUERY = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
      id
    }
  }
`;
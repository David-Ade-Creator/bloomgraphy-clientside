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
      username
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


export const SEND_MESSAGE = gql`
mutation($content:String!,$receiver:String!){
  sendMessage(content:$content, receiver:$receiver){
    id
    receiver
    sender
    content
  }
  }`;
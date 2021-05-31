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
    $images: [String]!
  ) {
    createPost(body: $body, title: $title, type: $type, images: $images) {
      body
      createdAt
      id
      images
      username
    }
  }
`;

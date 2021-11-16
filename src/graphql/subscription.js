import gql from "graphql-tag";

export const NEW_MESSAGE = gql`
  subscription newMessage {
    newMessage {
      id
      content
      createdAt
      sender {
        id
        username
        firstName
        lastName
      }
      receiver {
        id
        username
        firstName
        lastName
      }
    }
  }
`;

export const UPDATED_CHATUSERS = gql`
  subscription updatedChatUsers {
    updatedChatUsers {
      id
      username
      firstName
      lastName
      lastmessage
      photo
    }
  }
`;

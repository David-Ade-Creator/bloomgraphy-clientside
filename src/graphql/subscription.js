import gql from "graphql-tag";

export const NEW_MESSAGE = gql`
  subscription newMessage {
    newMessage {
    id
    receiver
    content
    sender
    createdAt
    }
  }
`
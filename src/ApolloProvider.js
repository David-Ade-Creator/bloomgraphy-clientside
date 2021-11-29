import React from "react";
import NextApp from "./NextApp";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  split,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

let httpLink = createHttpLink({
  uri: "https://bloomgraphy.herokuapp.com",
  // uri: "http://localhost:5000",
});

const authLink = setContext(() => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

httpLink = authLink.concat(httpLink)

const wsLink = new WebSocketLink({
  // uri: `ws://localhost:5000/graphql`,
  uri: `ws://bloomgraphy.herokuapp.com/graphql`,
  options: {
    reconnect: true,
    timeout: 80000,
    connectionParams: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <NextApp />
  </ApolloProvider>
);

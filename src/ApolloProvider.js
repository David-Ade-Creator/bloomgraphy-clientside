import React from "react";
import NextApp from "./NextApp";
import ApolloClient from "apollo-client";
import jwtDecode from "jwt-decode";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
  uri: "http://localhost:5000",
});

const authLink = setContext(() => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// if (localStorage.getItem("token")) {
//   const decodedToken = jwtDecode(localStorage.getItem("token"));
//   if (decodedToken.exp * 1000 < Date.now()) {
//     localStorage.removeItem("token");
//     console.log("logout");
//   }
// }

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <NextApp />
  </ApolloProvider>
);

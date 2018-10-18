import React, { Component } from "react";
import Routes from "./routes";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "url-polyfill";
import "../styles/App.css";

const url = new URL("graphql", process.env.REACT_APP_SERVER_URL);
const client = new ApolloClient({ uri: url });

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    );
  }
}

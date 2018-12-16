import React, { Component } from "react";
import Routes from "./routes";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../reducers";
import "moment/locale/ja";
import "url-polyfill";
import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.css";

const url = new URL("graphql", process.env.REACT_APP_SERVER_URL);
const client = new ApolloClient({ uri: url });
const store = createStore(rootReducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Routes />
        </ApolloProvider>
      </Provider>
    );
  }
}

import React, { Component } from "react";
import { Redirect } from "react-router";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import LoadingOverlay from "react-loading-overlay";
import { viewerQuery } from "./viewerQuery";

export default class LoginAuth extends Component {
  render() {
    let context = {
      headers: {
        authorization: localStorage.getItem("accessToken")
      }
    };

    const gqlQuery = gql`
      query {
        ${viewerQuery}
      }
    `;

    return (
      <Query query={gqlQuery} context={context} fetchPolicy="network-only">
        {({ loading, data }) => {
          if (loading)
            return <LoadingOverlay active={true} spinner color="#202124" />;
          if (!data.viewer) return <Redirect to="/login" />;
          if (data) return this.props.children;
        }}
      </Query>
    );
  }
}

import React, { Component } from "react";
import { Redirect } from "react-router";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import { viewerQuery } from "./viewerQuery";
import Loading from "../loading";

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
          if (loading) return <Loading />;
          if (!data.viewer) {
            toast.error(<FormattedMessage id="errors.notLogin" />);
            return <Redirect to="/login" />;
          }
          if (data) return this.props.children;
        }}
      </Query>
    );
  }
}

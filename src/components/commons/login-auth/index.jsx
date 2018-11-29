import React, { Component } from "react";
import { Redirect } from "react-router";
import { Query } from "react-apollo";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import { viewerQuery } from "./viewerQuery";
import Loading from "../loading";
import { context } from "../../commons/context";

export default class LoginAuth extends Component {
  render() {
    return (
      <Query query={viewerQuery} context={context()} fetchPolicy="network-only">
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

import React, { Component } from "react";
import { Redirect } from "react-router";
import GqlQuery from "../gql-query";
import { viewerQuery } from "./viewerQuery";

export default class LoginAuth extends Component {
  render() {
    let context = {
      headers: {
        authorization: localStorage.getItem("access_token")
      }
    };

    return (
      <GqlQuery
        context={context}
        query={viewerQuery}
        errorComponent={<Redirect to="/login" />}
      >
        <div className="wrapper">OK</div>
      </GqlQuery>
    );
  }
}

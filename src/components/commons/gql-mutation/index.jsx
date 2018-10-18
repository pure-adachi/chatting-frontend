import React, { Component } from "react";
import { Query } from "react-apollo";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
// import Loading from "../loading";

class GqlMutation extends Component {
  render() {
    const {
      loadingComponent,
      // errorComponent,
      query,
      mutation,
      context
      // children
    } = this.props;

    if (!mutation) {
      return <div />;
    }

    const gqlQuery = gql`query {${query}}`;

    const gqlMutation = gql`mutation ${mutation}`;

    if (!query) {
      return (
        <Mutation mutation={gqlMutation}>
          {(
            mutateAction,
            { loading: mutateLoading, error, data: mutateData }
          ) => {
            return this.props.form(
              mutateAction,
              mutateData,
              mutateLoading ? loadingComponent : <div />,
              error
            );
          }}
        </Mutation>
      );
    } else {
      return (
        <div className="col-md-12">
          {
            <Query query={gqlQuery} context={context}>
              {({ loading: queryLoading, data: queryData }) => {
                if (queryLoading) return loadingComponent;
                return (
                  <Mutation mutation={gqlMutation}>
                    {(
                      mutateAction,
                      { loading: mutateLoading, data: mutateData }
                    ) => {
                      if (mutateLoading) return loadingComponent;
                      return this.props.form(
                        mutateAction,
                        queryData,
                        mutateData
                      );
                    }}
                  </Mutation>
                );
              }}
            </Query>
          }
        </div>
      );
    }
  }
}

GqlMutation.defaultProps = {
  loadingComponent: <div>Now Loading...</div>,
  // errorComponent: <div />,
  query: null,
  mutation: null,
  context: {
    headers: {
      authorization: localStorage.getItem("access_token")
    }
  }
};

export default GqlMutation;

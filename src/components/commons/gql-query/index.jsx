import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

class GqlQuery extends Component {
  render() {
    const {
      loadingComponent,
      errorComponent,
      query,
      context,
      children
    } = this.props;

    if (!query) {
      return <div />;
    }

    const gqlQuery = gql`
      query {
        ${query}
      }
    `;

    return (
      <div>
        {
          <Query query={gqlQuery} context={context}>
            {({ loading, error, data }) => {
              if (loading) return loadingComponent;
              if (error) return errorComponent;
              if (data) return children;
            }}
          </Query>
        }
      </div>
    );
  }
}

GqlQuery.defaultProps = {
  loadingComponent: <div />,
  errorComponent: <div />,
  query: null,
  context: {
    headers: {
      authorization: localStorage.getItem("access_token")
    }
  }
};

export default GqlQuery;

import gql from "graphql-tag";

export const viewerQuery = gql`
  query {
    viewer {
      id
      sei
      mei
      kanaSei
      kanaMei
      loginid
      language
    }
  }
`;

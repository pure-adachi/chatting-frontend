import gql from "graphql-tag";

export const usersQuery = gql`
  query {
    users(ignoreSelf: true) {
      id
      sei
      mei
      talkRoom {
        id
      }
    }
  }
`;

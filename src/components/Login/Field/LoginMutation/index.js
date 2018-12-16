import gql from "graphql-tag";

export const loginMutation = gql`
  mutation login($loginid: String!, $password: String!) {
    login(input: { loginid: $loginid, password: $password }) {
      user {
        id
        latestAcessToken
        errors {
          keys
          field
        }
      }
      result
    }
  }
`;

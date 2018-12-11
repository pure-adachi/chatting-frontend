import gql from "graphql-tag";

export const createMessageMutation = gql`
  mutation createTalkRoom($userId: ID!) {
    createTalkRoom(input: { userId: $userId }) {
      talkRoom {
        id
      }
      result
    }
  }
`;

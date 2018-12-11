import gql from "graphql-tag";

export const createMessageMutation = gql`
  mutation createTalkRoom($userIds: [ID]!) {
    createTalkRoom(input: { userIds: $userIds }) {
      talkRoom {
        id
      }
      result
    }
  }
`;

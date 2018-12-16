import gql from "graphql-tag";

export const createTalkRoomMutation = gql`
  mutation createTalkRoom($title: String!, $group: Boolean!, $userIds: [ID!]!) {
    createTalkRoom(input: { title: $title, group: $group, userIds: $userIds }) {
      talkRoom {
        id
      }
      result
    }
  }
`;

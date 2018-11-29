import gql from "graphql-tag";

export const createMessageMutation = gql`
  mutation createMessage($talkRoomId: ID!, $body: String!) {
    createMessage(input: { talkRoomId: $talkRoomId, body: $body }) {
      result
    }
  }
`;

import gql from "graphql-tag";

export const talkRoomsQuery = gql`
  query {
    talkRooms(group: true) {
      id
      title
    }
  }
`;

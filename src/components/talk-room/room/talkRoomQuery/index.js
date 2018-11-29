import gql from "graphql-tag";

export function talkRoomQuery(id) {
  return gql`
    query {
      node(id: "${id}") {
        id
        ... on TalkRoom {
          id
          messages {
            edges {
              node {
                body
                ownTalk
                user {
                  id
                  sei
                  mei
                }
              }
            }
          }
        }
      }
    }
  `;
}

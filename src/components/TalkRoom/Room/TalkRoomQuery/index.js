import gql from "graphql-tag";

export function talkRoomQuery(queryOpt) {
  return gql`
    query {
      node(id: "${queryOpt.id}") {
        id
        ... on TalkRoom {
          id
          title
          group
          users {
            edges {
              node {
                sei
                mei
              }
            }
          }
          messages
          ${
            queryOpt.first || queryOpt.after
              ? `
            (
              ${queryOpt.first ? `first: "${queryOpt.first}"` : ""}
              ${queryOpt.after ? `after: "${queryOpt.after}"` : ""}
            )`
              : ""
          } {
            edges {
              node {
                body
                ownTalk
                createdAt
                user {
                  id
                  sei
                  mei
                  avatar
                }
              }
            }
          }
        }
      }
    }
  `;
}

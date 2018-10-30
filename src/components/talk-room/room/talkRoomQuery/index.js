export function talkRoomQuery(id) {
  return `node(id: "${id}") {
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
  }`;
}

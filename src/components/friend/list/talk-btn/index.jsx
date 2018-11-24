import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router";
import Button from "@material/react-button";

class TalkBtn extends Component {
  createTalkRoom(userId) {
    console.log(userId);
  }

  render() {
    let context = {
      headers: {
        authorization: localStorage.getItem("accessToken")
      }
    };

    const gqlMutation = gql`
      mutation createTalkRoom($userId: ID!) {
        createTalkRoom(input: { userId: $userId }) {
          result
        }
      }
    `;

    return (
      <Mutation mutation={gqlMutation} context={context}>
        {(action, { loading }) => {
          return (
            <FormattedMessage
              id="components.friend.list.talk-btn.fullname"
              values={{ sei: this.props.user.sei, mei: this.props.user.mei }}
            >
              {userName => (
                <FormattedMessage id="components.friend.list.talk-btn.talk">
                  {text => (
                    <FormattedMessage
                      id="components.friend.list.talk-btn.confirmCreateTalkRoom"
                      values={{ name: userName }}
                    >
                      {confirmMsg => (
                        <Button
                          className="auto btn-primary"
                          raised={true}
                          disabled={loading}
                          onClick={() =>
                            this.props.user.talkRoom
                              ? this.props.history.push(
                                  `/talkRooms/${this.props.user.talkRoom.id}`
                                )
                              : window.confirm(confirmMsg)
                                ? action({
                                    variables: {
                                      userId: this.props.user.id
                                    }
                                  })
                                : null
                          }
                        >
                          {text}
                        </Button>
                      )}
                    </FormattedMessage>
                  )}
                </FormattedMessage>
              )}
            </FormattedMessage>
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(TalkBtn);

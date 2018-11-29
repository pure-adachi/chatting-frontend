import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Mutation } from "react-apollo";
import { withRouter, Redirect } from "react-router";
import Button from "@material/react-button";
import { createMessageMutation } from "./createTalkRoomMutation";
import { context } from "../../../commons/context";

class TalkBtn extends Component {
  render() {
    return (
      <Mutation mutation={createMessageMutation} context={context()}>
        {(action, { loading, data }) => {
          if (data && data.createTalkRoom && data.createTalkRoom) {
            return (
              <Redirect to={`/talkRooms/${data.createTalkRoom.talkRoom.id}`} />
            );
          }
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

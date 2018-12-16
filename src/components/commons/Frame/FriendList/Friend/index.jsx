import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Mutation } from "react-apollo";
import { withRouter, Redirect } from "react-router";
import { createMessageMutation } from "./CreateTalkRoomMutation";
import { context } from "../../../Context";

class Friend extends Component {
  render() {
    return (
      <Mutation mutation={createMessageMutation} context={context()}>
        {(action, { data }) => {
          if (data && data.createTalkRoom && data.createTalkRoom) {
            this.props.refetch();
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
                <FormattedMessage
                  id="components.friend.list.talk-btn.confirmCreateTalkRoom"
                  values={{ name: userName }}
                >
                  {confirmMsg => (
                    <div
                      onClick={() =>
                        this.props.user.talkRoom
                          ? this.props.history.push(
                              `/talkRooms/${this.props.user.talkRoom.id}`
                            )
                          : window.confirm(confirmMsg)
                          ? action({
                              variables: {
                                userIds: [this.props.user.id]
                              }
                            })
                          : null
                      }
                    >
                      <img
                        className="avatar"
                        src={this.props.user.avatar}
                        alt="avatar"
                      />

                      <FormattedMessage
                        id="components.commons.frame.FriendList.Friend.fullname"
                        values={{
                          sei: this.props.user.sei,
                          mei: this.props.user.mei
                        }}
                      />
                    </div>
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

export default withRouter(Friend);

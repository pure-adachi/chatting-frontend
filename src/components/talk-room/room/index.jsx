import React, { Component } from "react";
import { withRouter } from "react-router";
import { Query } from "react-apollo";
import { talkRoomQuery } from "./talkRoomQuery";
import ChatBody from "./chat-body";
import Loading from "../../commons/loading";
import { context } from "../../commons/context";

class Room extends Component {
  render() {
    const query = talkRoomQuery({
      id: this.props.match.params.id
    });

    return (
      <Query query={query} context={context()}>
        {({ loading, data, refetch }) => {
          if (Object.keys(data).length === 0) return <Loading />;
          return (
            <ChatBody
              key={new Date()}
              room={data.node}
              refetch={refetch}
              loading={loading}
            />
          );
        }}
      </Query>
    );
  }
}

export default withRouter(Room);

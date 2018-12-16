import React, { Component } from "react";
import { withRouter } from "react-router";
import { Query } from "react-apollo";
import { talkRoomQuery } from "./TalkRoomQuery";
import ChatBody from "./ChatBody";
import Loading from "../../commons/Loading";
import { context } from "../../commons/Context";

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

import React, { Component } from "react";
import { withRouter } from "react-router";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { talkRoomQuery } from "./talkRoomQuery";
import ChatBody from "./chat-body";
import Loading from "../../commons/loading";

class Room extends Component {
  render() {
    let context = {
      headers: {
        authorization: localStorage.getItem("accessToken")
      }
    };

    const gqlQuery = gql`
      query {
        ${talkRoomQuery(this.props.match.params.id)}
      }
    `;

    return (
      <section className="row text-center placeholders">
        <div className="table-responsive mx-2">
          <Query query={gqlQuery} context={context} notifyOnNetworkStatusChange>
            {({ loading, data, refetch }) => {
              if (Object.keys(data).length === 0) return <Loading />;
              return (
                <ChatBody
                  room={data.node}
                  refetch={() => refetch()}
                  loading={loading}
                />
              );
            }}
          </Query>
        </div>
      </section>
    );
  }
}

export default withRouter(Room);

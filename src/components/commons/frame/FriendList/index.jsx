import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Query } from "react-apollo";
import { withRouter } from "react-router";
import { usersQuery } from "./UsersQuery";
import Friend from "./Friend";
import { context } from "../../context";
import Loading from "../../loading";

class FriendList extends Component {
  render() {
    return (
      <Query query={usersQuery} context={context()} fetchPolicy="network-only">
        {({ loading, data }) => {
          if (loading) return <Loading />;
          if (data.users) {
            return (
              <ul className="nav nav-pills flex-column">
                <li className="header">
                  <FormattedMessage id="components.commons.frame.FriendList.friends" />
                  <span>{data.users.length}</span>
                </li>

                {data.users.map((user, i) => {
                  return (
                    <li key={i}>
                      <span
                        className={`nav-link ${
                          user.talkRoom &&
                          this.props.match.params.id === user.talkRoom.id
                            ? "active"
                            : ""
                        }`}
                      >
                        <Friend user={user} />
                      </span>
                    </li>
                  );
                })}
              </ul>
            );
          }
        }}
      </Query>
    );
  }
}

export default withRouter(FriendList);

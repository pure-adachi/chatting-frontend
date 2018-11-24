import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { usersQuery } from "./usersQuery";
import Loading from "../../commons/loading";
import TalkBtn from "./talk-btn";

export default class List extends Component {
  render() {
    let context = {
      headers: {
        authorization: localStorage.getItem("accessToken")
      }
    };

    const gqlQuery = gql`
      query {
        ${usersQuery}
      }
    `;

    return (
      <section className="row text-center placeholders">
        <div className="table-responsive mx-2">
          <Query query={gqlQuery} context={context}>
            {({ loading, data }) => {
              if (loading) return <Loading />;
              if (data.users) {
                return (
                  <table className="table table-striped">
                    <tbody>
                      {data.users.map((user, i) => {
                        return (
                          <tr key={i}>
                            <td>
                              <FormattedMessage
                                id="components.friend.list.fullname"
                                values={{ sei: user.sei, mei: user.mei }}
                              />
                            </td>
                            <td>
                              <TalkBtn user={user} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                );
              }
            }}
          </Query>
        </div>
      </section>
    );
  }
}

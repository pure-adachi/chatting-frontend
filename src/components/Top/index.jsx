import React, { Component } from "react";
import { Query } from "react-apollo";
import { Redirect } from "react-router";
import { viewerQuery } from "./ViewerQuery";
import Loading from "../commons/Loading";
import LoginAuth from "../commons/LoginAuth";
import Frame from "../commons/Frame";
import ChattingIcon from "../commons/ChattingIcon";
import { context } from "../commons/Context";

export default class Top extends Component {
  render() {
    return (
      <LoginAuth>
        <Frame>
          <Query
            query={viewerQuery}
            context={context()}
            fetchPolicy="network-only"
          >
            {({ loading, data }) => {
              if (loading) return <Loading />;
              if (data && data.viewer.latestMessage) {
                return (
                  <Redirect
                    to={`/talkRooms/${data.viewer.latestMessage.talkRoom.id}`}
                  />
                );
              }
              return (
                <section>
                  <h1>Dashboard</h1>

                  <section className="row text-center placeholders col-md-12">
                    <div className="col-6 col-sm-3 placeholder">
                      <ChattingIcon width="200" height="200" />
                      <h4>Label</h4>
                      <div className="text-muted">Chatting Icon</div>
                    </div>
                    <div className="col-6 col-sm-3 placeholder">
                      <img
                        src="data:image/gif;base64,R0lGODlhAQABAIABAADcgwAAACwAAAAAAQABAAACAkQBADs="
                        width="200"
                        height="200"
                        className="img-fluid rounded-circle"
                        alt="Generic placeholder thumbnail"
                      />
                      <h4>Label</h4>
                      <span className="text-muted">Something else</span>
                    </div>
                    <div className="col-6 col-sm-3 placeholder">
                      <img
                        src="data:image/gif;base64,R0lGODlhAQABAIABAAJ12AAAACwAAAAAAQABAAACAkQBADs="
                        width="200"
                        height="200"
                        className="img-fluid rounded-circle"
                        alt="Generic placeholder thumbnail"
                      />
                      <h4>Label</h4>
                      <span className="text-muted">Something else</span>
                    </div>
                    <div className="col-6 col-sm-3 placeholder">
                      <img
                        src="data:image/gif;base64,R0lGODlhAQABAIABAADcgwAAACwAAAAAAQABAAACAkQBADs="
                        width="200"
                        height="200"
                        className="img-fluid rounded-circle"
                        alt="Generic placeholder thumbnail"
                      />
                      <h4>Label</h4>
                      <span className="text-muted">Something else</span>
                    </div>
                  </section>

                  <h2>Section title</h2>
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Header</th>
                          <th>Header</th>
                          <th>Header</th>
                          <th>Header</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1,001</td>
                          <td>Lorem</td>
                          <td>ipsum</td>
                          <td>dolor</td>
                          <td>sit</td>
                        </tr>
                        <tr>
                          <td>1,002</td>
                          <td>amet</td>
                          <td>consectetur</td>
                          <td>adipiscing</td>
                          <td>elit</td>
                        </tr>
                        <tr>
                          <td>1,003</td>
                          <td>Integer</td>
                          <td>nec</td>
                          <td>odio</td>
                          <td>Praesent</td>
                        </tr>
                        <tr>
                          <td>1,003</td>
                          <td>libero</td>
                          <td>Sed</td>
                          <td>cursus</td>
                          <td>ante</td>
                        </tr>
                        <tr>
                          <td>1,004</td>
                          <td>dapibus</td>
                          <td>diam</td>
                          <td>Sed</td>
                          <td>nisi</td>
                        </tr>
                        <tr>
                          <td>1,005</td>
                          <td>Nulla</td>
                          <td>quis</td>
                          <td>sem</td>
                          <td>at</td>
                        </tr>
                        <tr>
                          <td>1,006</td>
                          <td>nibh</td>
                          <td>elementum</td>
                          <td>imperdiet</td>
                          <td>Duis</td>
                        </tr>
                        <tr>
                          <td>1,007</td>
                          <td>sagittis</td>
                          <td>ipsum</td>
                          <td>Praesent</td>
                          <td>mauris</td>
                        </tr>
                        <tr>
                          <td>1,008</td>
                          <td>Fusce</td>
                          <td>nec</td>
                          <td>tellus</td>
                          <td>sed</td>
                        </tr>
                        <tr>
                          <td>1,009</td>
                          <td>augue</td>
                          <td>semper</td>
                          <td>porta</td>
                          <td>Mauris</td>
                        </tr>
                        <tr>
                          <td>1,010</td>
                          <td>massa</td>
                          <td>Vestibulum</td>
                          <td>lacinia</td>
                          <td>arcu</td>
                        </tr>
                        <tr>
                          <td>1,011</td>
                          <td>eget</td>
                          <td>nulla</td>
                          <td>Class</td>
                          <td>aptent</td>
                        </tr>
                        <tr>
                          <td>1,012</td>
                          <td>taciti</td>
                          <td>sociosqu</td>
                          <td>ad</td>
                          <td>litora</td>
                        </tr>
                        <tr>
                          <td>1,013</td>
                          <td>torquent</td>
                          <td>per</td>
                          <td>conubia</td>
                          <td>nostra</td>
                        </tr>
                        <tr>
                          <td>1,014</td>
                          <td>per</td>
                          <td>inceptos</td>
                          <td>himenaeos</td>
                          <td>Curabitur</td>
                        </tr>
                        <tr>
                          <td>1,015</td>
                          <td>sodales</td>
                          <td>ligula</td>
                          <td>in</td>
                          <td>libero</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
              );
            }}
          </Query>
        </Frame>
      </LoginAuth>
    );
  }
}

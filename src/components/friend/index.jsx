import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import LoginAuth from "../commons/login-auth";
import Frame from "../commons/frame";
import Sidemunu from "../commons/sidemenu";
import List from "./list";

export default class Friend extends Component {
  render() {
    return (
      <LoginAuth>
        <Frame>
          <div className="container-fluid">
            <div className="row">
              <Sidemunu />
              <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
                <h1>
                  <FormattedMessage id="components.friend.title" />
                </h1>

                <List />
              </main>
            </div>
          </div>
        </Frame>
      </LoginAuth>
    );
  }
}

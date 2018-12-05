import React, { Component } from "react";
import LoginAuth from "../commons/login-auth";
import Frame from "../commons/frame";
import Room from "./room";

export default class TalkRoom extends Component {
  render() {
    return (
      <LoginAuth>
        <Frame>
          <Room />
        </Frame>
      </LoginAuth>
    );
  }
}

import React, { Component } from "react";
import LoginAuth from "../commons/LoginAuth";
import Frame from "../commons/Frame";
import Room from "./Room";

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

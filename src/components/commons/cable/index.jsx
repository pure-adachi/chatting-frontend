import React, { Component } from "react";
import ActionCable from "actioncable";

export default class Cable extends Component {
  componentDidMount() {
    const self = this;
    const cable = ActionCable.createConsumer(
      `${
        process.env.REACT_APP_SERVER_URL
      }/cable?access_token=${localStorage.getItem("accessToken")}`
    );
    // const chat =
    cable.subscriptions.create("RoomChannel", {
      connected() {
        console.log("connected");
      },

      disconnected() {
        console.log("disconnected");
      },

      received(data) {
        console.log("received", data);
        self.props.receivedAction();
        // $("#messages").append(data["message"]);
      },

      speak(mes = "hello") {
        this.perform("speak", { mes });
      }
    });
  }

  render() {
    return <meta name="action-cable-url" />;
  }
}

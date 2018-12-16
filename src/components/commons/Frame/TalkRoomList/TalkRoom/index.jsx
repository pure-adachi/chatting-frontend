import React, { Component } from "react";
import { withRouter } from "react-router";

class TalkRoom extends Component {
  render() {
    return (
      <div
        onClick={() =>
          this.props.history.push(`/talkRooms/${this.props.talkRoom.id}`)
        }
      >
        {this.props.talkRoom.title}
      </div>
    );
  }
}

export default withRouter(TalkRoom);

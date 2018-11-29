import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router";
import TextField, { Input } from "@material/react-text-field";
import Button from "@material/react-button";
import Loading from "../../../commons/loading";
import * as RootActions from "../../../../actions";
import { createMessageMutation } from "./createMessageMutation";
import { context } from "../../../commons/context";

class ChatBody extends Component {
  constructor(props) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);

    this.state = {
      input: {
        body: null
      }
    };
  }

  componentDidMount() {
    this.props.state.cable.subscription.received = () => {
      this.props.refetch();
    };
  }

  inputChange(val) {
    this.setState({
      ...this.state,
      input: {
        ...this.state.input,
        body: val
      }
    });
  }

  sendMessage(action) {
    if (this.state.input.body) {
      action({
        variables: {
          talkRoomId: this.props.match.params.id,
          body: this.state.input.body
        }
      });
      this.inputChange(null);
    }
  }

  render() {
    return (
      <div>
        {this.props.loading && <Loading />}
        <div className="direct-chat-messages direct-chat-warning">
          {this.props.room.messages.edges.map((message, i) => {
            return (
              <div
                key={i}
                className={`direct-chat-msg ${
                  message.node.ownTalk ? "" : "right"
                }`}
              >
                <div className="direct-chat-info clearfix">
                  <span
                    className={`direct-chat-name pull-${
                      message.node.ownTalk ? "left" : "right"
                    }`}
                  >
                    {message.node.user.sei}
                    {message.node.user.mei}
                  </span>
                  <span
                    className={`direct-chat-timestamp pull-${
                      message.node.ownTalk ? "right" : "left"
                    }`}
                  >
                    時間
                  </span>
                </div>
                <img className="direct-chat-img" alt={message.node.body} />
                <div className="direct-chat-text">{message.node.body}</div>
              </div>
            );
          })}
        </div>
        <FormattedMessage id="components.talk-room.room.chat-body.sendMessage">
          {text => (
            <div>
              <FormattedMessage id="components.talk-room.room.chat-body.inputMessage">
                {messageField => (
                  <TextField outlined={true} label={messageField}>
                    <Input
                      value={this.state.input.body || ""}
                      onChange={e => this.inputChange(e.target.value)}
                    />
                  </TextField>
                )}
              </FormattedMessage>
              <Mutation mutation={createMessageMutation} context={context()}>
                {(action, { loading }) => {
                  return (
                    <div>
                      <Loading active={loading} />
                      <Button
                        className="auto btn-primary"
                        raised={true}
                        onClick={() => this.sendMessage(action)}
                        disabled={this.props.loading}
                      >
                        {text}
                      </Button>
                    </div>
                  );
                }}
              </Mutation>
            </div>
          )}
        </FormattedMessage>
      </div>
    );
  }
}

export default connect(
  state => {
    return { state: state.root };
  },
  dispatch => {
    return {
      actions: bindActionCreators(RootActions, dispatch)
    };
  }
)(withRouter(ChatBody));

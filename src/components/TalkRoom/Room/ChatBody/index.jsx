import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Moment from "react-moment";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router";
import TextareaAutosize from "react-autosize-textarea";
import {
  Navbar,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Loading from "../../../commons/Loading";
import * as RootActions from "../../../../actions";
import { createMessageMutation } from "./CreateMessageMutation";
import { context } from "../../../commons/Context";
import CustomScrollbars from "../../../commons/CustomScrollbars";

class ChatBody extends Component {
  constructor(props) {
    super(props);

    this.inputChange = this.inputChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);

    this.state = {
      input: {
        body: null
      }
    };
  }

  componentDidMount() {
    this.scrollFrame.view.scrollTop = this.scrollFrame.view.scrollHeight;

    this.props.state.cable.subscription.received = () => {
      this.props.refetch();
      this.scrollFrame.scrollToBottom();
    };
  }

  inputChange(e) {
    if (!e) {
      return;
    }

    this.setState({
      ...this.state,
      input: {
        ...this.state.input,
        body: e.target.value.trim()
      }
    });
  }

  sendMessage(action) {
    if (this.state.input.body) {
      this.inputChange(null);
      action({
        variables: {
          talkRoomId: this.props.match.params.id,
          body: this.state.input.body
        }
      });
    }
  }

  render() {
    return (
      <div className="chat">
        <div className="chat-header">
          <Navbar expand="md" className="navbar-inverse py-0 h-100">
            <Nav navbar>
              <NavItem>
                {this.props.room.group ? (
                  this.props.room.title
                ) : (
                  <FormattedMessage id="components.talk-room.title" />
                )}
              </NavItem>
            </Nav>

            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="text-secondary">
                  <FormattedMessage id="components.talk-room.room.chat-body.members" />
                </DropdownToggle>
                <DropdownMenu right className="position-absolute">
                  {this.props.room.users.edges.map((user, i) => {
                    return (
                      <DropdownItem key={i}>
                        <FormattedMessage
                          id="components.talk-room.room.chat-body.fullname"
                          values={{
                            sei: user.node.sei,
                            mei: user.node.mei
                          }}
                        />
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Navbar>
        </div>

        {this.props.loading && <Loading />}
        <CustomScrollbars
          className="chat-body"
          ref={node => (this.scrollFrame = node && node.refs.scrollbar)}
        >
          {this.props.room.messages.edges.map((message, i) => {
            return (
              <div
                key={i}
                className={`${
                  message.node.ownTalk ? "outgoing_msg" : "incoming_msg"
                }`}
              >
                {!message.node.ownTalk && (
                  <div className="incoming_msg_img">
                    <img src={message.node.user.avatar} alt="avatar" />
                  </div>
                )}

                <div
                  className={`${
                    message.node.ownTalk ? "sent_msg" : "received_msg"
                  }`}
                >
                  {!message.node.ownTalk && (
                    <span className="user-name">
                      <FormattedMessage
                        id="components.talk-room.room.chat-body.fullname"
                        values={{
                          sei: message.node.user.sei,
                          mei: message.node.user.mei
                        }}
                      />
                    </span>
                  )}
                  <p>
                    <TextareaAutosize value={message.node.body} readOnly />
                  </p>
                  <Moment
                    className="time_date"
                    fromNow
                    locale={this.props.intl.locale}
                  >
                    {message.node.createdAt}
                  </Moment>
                </div>
              </div>
            );
          })}
        </CustomScrollbars>
        <Mutation mutation={createMessageMutation} context={context()}>
          {(action, { loading }) => {
            return (
              <div className="chat-footer">
                <textarea
                  type="text"
                  placeholder="Write your message..."
                  value={this.state.input.body || ""}
                  onChange={this.inputChange}
                  onKeyUp={e => {
                    if (e.key === "Enter" && e.shiftKey) {
                      this.sendMessage(action, e);
                    }
                  }}
                />
                <button
                  onClick={() => this.sendMessage(action)}
                  disabled={loading}
                >
                  <FormattedMessage id="components.talk-room.room.chat-body.sendMessage" />
                </button>
              </div>
            );
          }}
        </Mutation>
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
)(withRouter(injectIntl(ChatBody)));

import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Mutation, Query } from "react-apollo";
import { Redirect } from "react-router";
import Modal from "react-modal";
import { usersQuery } from "./UsersQuery";
import { createTalkRoomMutation } from "./CreateTalkRoomMutation";
import CustomScrollbars from "../../../CustomScrollbars";
import Loading from "../../../Loading";
import { context } from "../../../Context";

export default class NewTalkRoom extends Component {
  constructor() {
    super();

    this.inputTitleChange = this.inputTitleChange.bind(this);
    this.inputFriendChange = this.inputFriendChange.bind(this);

    this.state = {
      isChangedTitle: false,
      form: {
        title: null,
        group: true,
        userIds: []
      }
    };
  }

  inputTitleChange(e) {
    this.setState({
      isChangedTitle: true,
      form: {
        ...this.state.form,
        title: e.target.value
      }
    });
  }

  inputFriendChange(e) {
    if (e.target.checked) {
      this.setState({
        form: {
          ...this.state.form,
          userIds: this.state.form.userIds.concat(e.target.value)
        }
      });
    } else {
      this.setState({
        form: {
          ...this.state.form,
          userIds: this.state.form.userIds.filter(id => {
            return id !== e.target.value;
          })
        }
      });
    }
  }

  isValidForm() {
    const { title, userIds } = this.state.form;
    return title && userIds.length > 0;
  }

  hasTitileError() {
    return this.state.isChangedTitle && !this.state.form.title;
  }

  render() {
    return (
      <Modal
        overlayClassName="modal modal-overlay"
        className="modal-dialog"
        isOpen={this.props.modalIsOpen}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <FormattedMessage id="components.commons.frame.TalkRoomList.NewTalkRoom.createTalkRoom" />
            </h5>
            <button
              type="button"
              className="close"
              onClick={this.props.closeModal}
            >
              <i className="fa fa-close" />
            </button>
          </div>
          <div className="modal-body new-talk-room-form">
            <div className="talk-room-title">
              <label
                htmlFor="groupTitle"
                className="col-sm-2 col-form-label text-nowrap"
              >
                <FormattedMessage id="components.commons.frame.TalkRoomList.NewTalkRoom.title" />
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className={`form-control ${
                    this.hasTitileError() ? "is-invalid" : ""
                  }`}
                  id="groupTitle"
                  value={this.state.form.title || ""}
                  onChange={this.inputTitleChange}
                />
                {this.hasTitileError() && (
                  <small className="text-danger">
                    <FormattedMessage id="components.commons.frame.TalkRoomList.NewTalkRoom.inputRequired" />
                  </small>
                )}
              </div>
            </div>

            <div className="talk-room-users">
              <CustomScrollbars renderViewStyle={{ height: "auto" }}>
                <Query
                  query={usersQuery}
                  context={context()}
                  fetchPolicy="network-only"
                >
                  {({ loading, data }) => {
                    if (loading) return <Loading />;
                    if (data.users) {
                      return (
                        <div className="checkbox">
                          {data.users.map((user, i) => {
                            return (
                              <p key={i}>
                                <input
                                  type="checkbox"
                                  id={`friend${user.id}`}
                                  value={user.id}
                                  onChange={this.inputFriendChange}
                                />
                                <label htmlFor={`friend${user.id}`}>
                                  <FormattedMessage
                                    id="components.commons.frame.TalkRoomList.NewTalkRoom.fullname"
                                    values={{
                                      sei: user.sei,
                                      mei: user.mei
                                    }}
                                  />
                                </label>
                              </p>
                            );
                          })}
                        </div>
                      );
                    }
                  }}
                </Query>
              </CustomScrollbars>
            </div>
          </div>
          <div className="modal-footer">
            <Mutation mutation={createTalkRoomMutation} context={context()}>
              {(action, { loading, data }) => {
                if (!loading && data && data.createTalkRoom.result) {
                  this.props.refetch();
                  return (
                    <Redirect
                      to={`/talkRooms/${data.createTalkRoom.talkRoom.id}`}
                    />
                  );
                }
                if (!data || !data.createTalkRoom.result) {
                  return (
                    <button
                      type="button"
                      className="btn btn-primary"
                      disabled={!this.isValidForm() || loading}
                      onClick={() => {
                        action({
                          variables: this.state.form
                        });
                      }}
                    >
                      <FormattedMessage id="components.commons.frame.TalkRoomList.NewTalkRoom.saveTalkRoom" />
                    </button>
                  );
                }
              }}
            </Mutation>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.props.closeModal}
            >
              <FormattedMessage id="components.commons.frame.TalkRoomList.NewTalkRoom.cancel" />
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

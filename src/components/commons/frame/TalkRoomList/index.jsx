import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Query } from "react-apollo";
import { withRouter } from "react-router";
import Modal from "react-modal";
import { talkRoomsQuery } from "./TalkRoomsQuery";
import TalkRoom from "./TalkRoom";
import { context } from "../../context";
import Loading from "../../loading";
import NewTalkRoom from "./NewTalkRoom";

class TalkRoomList extends Component {
  constructor() {
    super();

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = {
      modalIsOpen: false
    };
  }

  componentWillMount() {
    Modal.setAppElement("body");
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <Query
        query={talkRoomsQuery}
        context={context()}
        fetchPolicy="network-only"
      >
        {({ loading, data }) => {
          if (loading) return <Loading />;
          if (data.talkRooms) {
            return (
              <ul className="nav nav-pills flex-column">
                <li>
                  <span className="nav-link" onClick={this.openModal}>
                    <div>
                      <FormattedMessage id="components.commons.frame.TalkRoomList.createTalkRoom" />
                    </div>
                  </span>

                  <NewTalkRoom
                    modalIsOpen={this.state.modalIsOpen}
                    closeModal={this.closeModal}
                  />
                </li>
                <li className="header">
                  <FormattedMessage id="components.commons.frame.TalkRoomList.groups" />
                  <span>{data.talkRooms.length}</span>
                </li>

                {data.talkRooms.map((talkRoom, i) => {
                  return (
                    <li key={i}>
                      <span
                        className={`nav-link ${
                          this.props.match.params.id === talkRoom.id
                            ? "active"
                            : ""
                        }`}
                      >
                        <TalkRoom talkRoom={talkRoom} />
                      </span>
                    </li>
                  );
                })}
              </ul>
            );
          }
        }}
      </Query>
    );
  }
}

export default withRouter(TalkRoomList);

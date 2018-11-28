import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import ActionCable from "actioncable";
import * as RootActions from "../../../actions";

class UserChannelCable extends Component {
  componentDidMount() {
    if (this.props.isLogged && !this.props.state.cable.subscription) {
      this.props.actions.setCable(
        ActionCable.createConsumer(
          `${
            process.env.REACT_APP_SERVER_URL
          }/cable?access_token=${localStorage.getItem("accessToken")}`
        ).subscriptions.create("UserChannel")
      );
    }
  }

  render() {
    return (
      <div className="wrapper-component">
        {this.props.isLogged && <meta name="action-cable-url" />}
        <ToastContainer />
        {this.props.header}
        {this.props.children}
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
)(UserChannelCable);

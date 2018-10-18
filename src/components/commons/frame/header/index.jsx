import React, { Component } from "react";
import { injectIntl } from "react-intl";
import TopAppBar from "@material/react-top-app-bar";

class Header extends Component {
  render() {
    return (
      <TopAppBar
        className="login-top-bar"
        title={this.props.intl.formatMessage({
          id: "components.commons.frame.header.title"
        })}
      />
    );
  }
}

export default injectIntl(Header);

import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import TopAppBar from "@material/react-top-app-bar";

export default class Header extends Component {
  render() {
    return (
      <FormattedMessage id="components.commons.frame.header.title">
        {title => <TopAppBar className="login-top-bar" title={title} />}
      </FormattedMessage>
    );
  }
}

import React, { Component } from "react";
import { addLocaleData, IntlProvider } from "react-intl";
import { ToastContainer } from "react-toastify";
import jaLocaleData from "react-intl/locale-data/ja";
import enLocaleData from "react-intl/locale-data/en";
import { ja } from "../i18n/ja";
import { en } from "../i18n/en";
import Header from "./header";

addLocaleData([...jaLocaleData, ...enLocaleData]);

export default class Frame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: {
        ja,
        en
      }
    };
  }

  render() {
    let language = this.props.language || "ja";

    let config = {
      locale: language,
      messages: this.state.messages[language]
    };

    return (
      <IntlProvider {...config}>
        <div className="wrapper-component">
          <ToastContainer />
          {this.props.header || <Header />}
          {this.props.children}
        </div>
      </IntlProvider>
    );
  }
}

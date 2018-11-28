import React, { Component } from "react";
import { addLocaleData, IntlProvider } from "react-intl";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import jaLocaleData from "react-intl/locale-data/ja";
import enLocaleData from "react-intl/locale-data/en";
import { ja } from "../i18n/ja";
import { en } from "../i18n/en";
import Header from "./header";
import { viewerQuery } from "./viewerQuery";
import Loading from "../loading";
import UserChannelCable from "../user-channel-cable";

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

    let context = {
      headers: {
        authorization: localStorage.getItem("accessToken")
      }
    };

    const gqlQuery = gql`
      query {
        ${viewerQuery}
      }
    `;

    return (
      <IntlProvider {...config}>
        <Query query={gqlQuery} context={context} fetchPolicy="network-only">
          {({ loading, data }) => {
            if (loading) return <Loading />;
            if (data) {
              return (
                <UserChannelCable
                  isLogged={!!data.viewer}
                  header={this.props.header || <Header />}
                >
                  {this.props.children}
                </UserChannelCable>
              );
            }
          }}
        </Query>
      </IntlProvider>
    );
  }
}

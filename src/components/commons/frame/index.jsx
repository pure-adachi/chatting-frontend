import React, { Component } from "react";
import { FormattedMessage, addLocaleData, IntlProvider } from "react-intl";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import jaLocaleData from "react-intl/locale-data/ja";
import enLocaleData from "react-intl/locale-data/en";
import { ja } from "../i18n/ja";
import { en } from "../i18n/en";
import { viewerQuery } from "./viewerQuery";
import Loading from "../loading";
import UserChannelCable from "../user-channel-cable";
import { context } from "../../commons/context";
import ChattingIcon from "../../commons/ChattingIcon";
import TalkRoomList from "./TalkRoomList";
import FriendList from "./FriendList";
import CustomScrollbars from "../../commons/CustomScrollbars";

addLocaleData([...jaLocaleData, ...enLocaleData]);

export default class Frame extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      isOpen: true,
      messages: {
        ja,
        en
      }
    };
  }

  componentDidMount() {
    if (window.innerWidth < 576) {
      this.setState({ isOpen: false });
    }
  }

  toggleNavbar() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    let language = this.props.language || "ja";

    let config = {
      locale: language,
      messages: this.state.messages[language]
    };

    return (
      <IntlProvider {...config}>
        <Query
          query={viewerQuery}
          context={context()}
          fetchPolicy="network-only"
        >
          {({ loading, data }) => {
            if (loading) return <Loading />;
            if (data) {
              return (
                <UserChannelCable isLogged={!!data.viewer}>
                  <Navbar
                    color="secondary"
                    expand="md"
                    className="navbar-inverse py-0"
                  >
                    <NavbarBrand href="/" className="text-white">
                      <ChattingIcon />
                      <FormattedMessage id="components.commons.frame.header.title" />
                    </NavbarBrand>

                    {data.viewer && (
                      <button
                        className="navbar-toggle"
                        onClick={this.toggleNavbar}
                      >
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                      </button>
                    )}

                    {data.viewer && (
                      <Nav className="ml-auto flex-row" navbar>
                        <NavItem>
                          <NavLink className="text-white p-2">
                            <FormattedMessage
                              id="components.commons.frame.header.fullname"
                              values={{
                                sei: data.viewer.sei,
                                mei: data.viewer.mei
                              }}
                            />
                          </NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle nav caret className="text-white">
                            <FormattedMessage id="components.commons.frame.header.options" />
                          </DropdownToggle>
                          <DropdownMenu right className="position-absolute">
                            <DropdownItem>
                              <FormattedMessage
                                id="components.commons.frame.header.fullname"
                                values={{
                                  sei: data.viewer.kanaSei,
                                  mei: data.viewer.kanaMei
                                }}
                              />
                            </DropdownItem>
                            <DropdownItem>{data.viewer.loginid}</DropdownItem>
                            <DropdownItem>
                              {
                                <FormattedMessage
                                  id={`default.languages.${
                                    data.viewer.language
                                  }`}
                                />
                              }
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>
                              <Link
                                to="/login"
                                className="nav-link"
                                onClick={() =>
                                  localStorage.removeItem("accessToken")
                                }
                              >
                                <FormattedMessage id="components.commons.sidemenu.logout" />
                              </Link>
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Nav>
                    )}
                  </Navbar>

                  <div className="container-fluid">
                    <div className="row">
                      {data.viewer && (
                        <Collapse
                          isOpen={this.state.isOpen}
                          className="p-0 col-sm-3 col-md-2 sidebar"
                        >
                          <CustomScrollbars
                            renderViewClassName="p-0"
                            renderTrackVerticalStyle={{ width: "6px" }}
                            renderThumbVerticalStyle={{
                              backgroundColor: "rgba(236, 238, 241, 0.5)"
                            }}
                          >
                            <TalkRoomList />
                            <FriendList />
                          </CustomScrollbars>
                        </Collapse>
                      )}
                      <main
                        className={`p-0 ${
                          this.state.isOpen && data.viewer
                            ? "col-sm-9 offset-sm-3 col-md-10 offset-md-2"
                            : "col-md-12"
                        }`}
                      >
                        <CustomScrollbars
                          renderViewClassName="p-0"
                          renderTrackVerticalStyle={{ width: "6px" }}
                          renderThumbVerticalStyle={{
                            backgroundColor: "rgba(54, 57, 71, 0.5)"
                          }}
                        >
                          {this.props.children}
                        </CustomScrollbars>
                      </main>
                    </div>
                  </div>
                </UserChannelCable>
              );
            }
          }}
        </Query>
      </IntlProvider>
    );
  }
}

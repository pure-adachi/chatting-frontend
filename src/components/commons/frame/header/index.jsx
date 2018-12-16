import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
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
import ChattingIcon from "../../../commons/ChattingIcon";

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      isOpen: true
    };
  }

  toggleNavbar() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <Navbar color="secondary" expand="md" className="navbar-inverse">
        <NavbarBrand href="/" className="text-white">
          <ChattingIcon />
          <FormattedMessage id="components.commons.frame.header.title" />
        </NavbarBrand>
        <button className="navbar-toggle" onClick={this.toggleNavbar}>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        {this.props.viewer && (
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="text-white">
                  <FormattedMessage
                    id="components.commons.frame.header.fullname"
                    values={{
                      sei: this.props.viewer.sei,
                      mei: this.props.viewer.mei
                    }}
                  />
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="text-white">
                  <FormattedMessage id="components.commons.frame.header.options" />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <FormattedMessage
                      id="components.commons.frame.header.fullname"
                      values={{
                        sei: this.props.viewer.kanaSei,
                        mei: this.props.viewer.kanaMei
                      }}
                    />
                  </DropdownItem>
                  <DropdownItem>{this.props.viewer.loginid}</DropdownItem>
                  <DropdownItem>
                    {
                      <FormattedMessage
                        id={`default.languages.${this.props.viewer.language}`}
                      />
                    }
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <Link
                      to="/login"
                      className="nav-link"
                      onClick={() => localStorage.removeItem("accessToken")}
                    >
                      <FormattedMessage id="components.commons.sidemenu.logout" />
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        )}
      </Navbar>
    );
  }
}

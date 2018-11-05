import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";

class Sidemunu extends Component {
  render() {
    const urls = ["friends", "talkRooms"];

    return (
      <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
        <ul className="nav nav-pills flex-column">
          {urls.map((url, i) => {
            return (
              <li key={i}>
                {this.props.match.path.indexOf(`/${url}`) === 0 ? (
                  <span className="nav-link active">
                    <FormattedMessage
                      id={`components.commons.sidemenu.${url}`}
                    />
                  </span>
                ) : (
                  <Link to={`/${url}`} className="nav-link">
                    <FormattedMessage
                      id={`components.commons.sidemenu.${url}`}
                    />
                  </Link>
                )}
              </li>
            );
          })}

          <li>
            <Link
              to="/login"
              className="nav-link"
              onClick={() => localStorage.setItem("accessToken", "")}
            >
              <FormattedMessage id="components.commons.sidemenu.logout" />
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Sidemunu);
import React, { Component } from "react";
import LoadingOverlay from "react-loading-overlay";

class Loading extends Component {
  render() {
    return (
      <div className="loading-frame">
        <LoadingOverlay {...this.props} />
      </div>
    );
  }
}

Loading.defaultProps = {
  active: true,
  spinner: true,
  color: "#202124"
};

export default Loading;

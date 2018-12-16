import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";

class CustomScrollbars extends Component {
  render() {
    const {
      renderViewClassName,
      renderTrackVerticalClassName,
      renderThumbVerticalClassName,
      renderViewStyle,
      renderTrackVerticalStyle,
      renderThumbVerticalStyle,
      ...scrollProps
    } = this.props;

    return (
      <Scrollbars
        renderView={props => (
          <div
            className={renderViewClassName}
            {...{
              ...props,
              style: {
                ...{
                  ...props.style,
                  padding: "30px 15px 0 25px"
                },
                ...renderViewStyle
              }
            }}
          />
        )}
        renderTrackVertical={props => (
          <div
            className={renderTrackVerticalClassName}
            {...{
              ...props,
              style: {
                ...{
                  ...props.style,
                  width: "12px",
                  right: "2px",
                  bottom: "2px",
                  top: "2px"
                },
                ...renderTrackVerticalStyle
              }
            }}
          />
        )}
        renderThumbVertical={props => (
          <div
            className={renderThumbVerticalClassName}
            {...{
              ...props,
              style: {
                ...{
                  ...props.style,
                  backgroundColor: "rgba(5, 114, 143, 0.5)",
                  borderRadius: "6px",
                  height: "210px"
                },
                ...renderThumbVerticalStyle
              }
            }}
          />
        )}
        ref="scrollbar"
        {...scrollProps}
      >
        {this.props.children}
      </Scrollbars>
    );
  }
}

CustomScrollbars.defaultProps = {
  autoHide: true,
  autoHideDuration: 1000,
  renderViewClassName: "",
  renderTrackVerticalClassName: "",
  renderThumbVerticalClassName: "",
  renderViewStyle: {},
  renderTrackVerticalStyle: {},
  renderThumbVerticalStyle: {}
};

export default CustomScrollbars;

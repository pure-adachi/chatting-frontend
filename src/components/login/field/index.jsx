import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { Query, Mutation } from "react-apollo";
import TextField, { HelperText, Input } from "@material/react-text-field";
import Button from "@material/react-button";
import { Redirect } from "react-router";
import Loading from "../../commons/loading";
import { viewerQuery } from "./viewerQuery";
import { loginMutation } from "./loginMutation";
import { context } from "../../commons/context";

class Field extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: {
        loginid: "",
        password: ""
      }
    };
  }

  inputChange(target, val) {
    this.setState({
      ...this.state,
      input: {
        ...this.state.input,
        [target]: val || ""
      }
    });
  }

  hasError(errors, key) {
    return !!errors.find(err => {
      return err.field === key;
    });
  }

  errorMessages(errors, key) {
    if (errors.length === 0) return null;

    let messages = errors.find(err => {
      return err.field === key;
    });

    if (!messages) return null;

    if (key === "base") {
      return (
        <div className="text-danger mb-3">
          {messages.keys.map((k, i) => {
            return <FormattedMessage key={i} id={`errors.${k}`} />;
          })}
        </div>
      );
    } else {
      return (
        <div className="text-danger mb-3">
          {messages.keys.map((k, i) => {
            return (
              <span key={i}>
                <FormattedMessage id={`models.attributes.user.${key}`} />
                &nbsp;
                <FormattedMessage id={`errors.${k}`} />
              </span>
            );
          })}
        </div>
      );
    }
  }

  render() {
    return (
      <div className="col-md-12 signin-component">
        {
          <Query query={viewerQuery} context={context()}>
            {({ loading: queryLoading, data: queryData }) => {
              if (queryLoading) return <Loading />;
              if (queryData.viewer) return <Redirect to="/" />;
              return (
                <Mutation mutation={loginMutation}>
                  {(action, { loading: mutateLoading, data: mutateData }) => {
                    if (
                      !mutateLoading &&
                      mutateData &&
                      mutateData.login.result
                    ) {
                      localStorage.setItem(
                        "accessToken",
                        mutateData.login.user.latestAcessToken
                      );
                      return <Redirect to={"/"} />;
                    } else {
                      return (
                        <div className="form-signin">
                          <h1 className="h3 mb-3">
                            <Loading active={mutateLoading} />
                            <FormattedMessage id="components.login.field.title" />
                          </h1>
                          {this.errorMessages(
                            mutateData ? mutateData.login.user.errors : [],
                            "base"
                          )}
                          <div className="mb-3">
                            {this.errorMessages(
                              mutateData ? mutateData.login.user.errors : [],
                              "loginid"
                            )}
                            <TextField
                              outlined={true}
                              label={this.props.intl.formatMessage({
                                id: "components.login.field.loginid"
                              })}
                              helperText={
                                <HelperText>
                                  <FormattedMessage id="components.login.field.loginidHelperText" />
                                </HelperText>
                              }
                              className={
                                this.hasError(
                                  mutateData
                                    ? mutateData.login.user.errors
                                    : [],
                                  "loginid"
                                )
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              <Input
                                value={this.state.input.loginid || ""}
                                onChange={e =>
                                  this.inputChange("loginid", e.target.value)
                                }
                                onKeyPress={e => {
                                  if (e.key === "Enter") {
                                    action({ variables: this.state.input });
                                  }
                                }}
                              />
                            </TextField>
                          </div>
                          <div>
                            {this.errorMessages(
                              mutateData ? mutateData.login.user.errors : [],
                              "password"
                            )}
                            <TextField
                              outlined={true}
                              label={this.props.intl.formatMessage({
                                id: "components.login.field.password"
                              })}
                              helperText={
                                <HelperText>
                                  <FormattedMessage id="components.login.field.passwordHelperText" />
                                </HelperText>
                              }
                              className={
                                this.hasError(
                                  mutateData
                                    ? mutateData.login.user.errors
                                    : [],
                                  "password"
                                )
                                  ? "is-invalid"
                                  : ""
                              }
                              onKeyPress={e => {
                                if (e.key === "Enter") {
                                  action({ variables: this.state.input });
                                }
                              }}
                            >
                              <Input
                                value={this.state.input.password || ""}
                                onChange={e =>
                                  this.inputChange("password", e.target.value)
                                }
                              />
                            </TextField>
                          </div>
                          <Button
                            className="auto bg-dark btn-block"
                            raised={true}
                            disabled={mutateLoading}
                            onClick={() =>
                              action({ variables: this.state.input })
                            }
                          >
                            {this.props.intl.formatMessage({
                              id: "components.login.field.signIn"
                            })}
                          </Button>
                        </div>
                      );
                    }
                  }}
                </Mutation>
              );
            }}
          </Query>
        }
      </div>
    );
  }
}

export default injectIntl(Field);

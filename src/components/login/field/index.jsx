import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import TextField, { HelperText, Input } from "@material/react-text-field";
import Button from "@material/react-button";
import { Redirect } from "react-router";
import LoadingOverlay from "react-loading-overlay";

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

  render() {
    let context = {
      headers: {
        authorization: localStorage.getItem("accessToken")
      }
    };

    const gqlQuery = gql`
      query {
        viewer {
          id
        }
      }
    `;

    const gqlMutation = gql`
      mutation login($loginid: String!, $password: String!) {
        login(input: { loginid: $loginid, password: $password }) {
          user {
            id
            latestAcessToken
            errors {
              keys
              field
            }
          }
          result
        }
      }
    `;

    return (
      <div className="mdc-top-app-bar--fixed-adjust signin-component">
        {
          <Query query={gqlQuery} context={context}>
            {({ loading: queryLoading, data: queryData }) => {
              if (queryLoading)
                return <LoadingOverlay active={true} spinner color="#202124" />;
              if (queryData.viewer) return <Redirect to="/" />;
              return (
                <Mutation mutation={gqlMutation}>
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
                      return (
                        <Redirect
                          to={{
                            pathname: "/",
                            state: {
                              token: mutateData.login.user.latestAcessToken
                            }
                          }}
                        />
                      );
                    } else {
                      return (
                        <div className="form-signin">
                          <h1 className="h3 mb-3">
                            <LoadingOverlay
                              active={mutateLoading}
                              spinner
                              color="#202124"
                            />
                            <FormattedMessage id="components.login.field.title" />
                          </h1>
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
                          >
                            <Input
                              value={this.state.input.loginid || ""}
                              onChange={e =>
                                this.inputChange("loginid", e.target.value)
                              }
                            />
                          </TextField>
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
                          >
                            <Input
                              value={this.state.input.password || ""}
                              onChange={e =>
                                this.inputChange("password", e.target.value)
                              }
                            />
                          </TextField>
                          <Button
                            className="auto btn-primary"
                            raised={true}
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

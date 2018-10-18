import React, { Component } from "react";
import { toast } from "react-toastify";
import { FormattedMessage, injectIntl } from "react-intl";
import TextField, { HelperText, Input } from "@material/react-text-field";
import Button from "@material/react-button";
import { Redirect } from "react-router";
import GqlMutation from "../../commons/gql-mutation";

class Field extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        loginid: null,
        password: null
      }
    };
  }

  inputChange(target, val) {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [target]: val
      }
    });
  }

  render() {
    const mutation = `
      login($loginId: String!, $password: String!) {
        login(input: { loginId: $loginId, password: $password }) {
          viewer {
            id
            errors {
              keys
              field
            }
          }
          result
        }
      }
    `;

    const formAction = (action, response, loadingComponent, error) => {
      if (error) toast.error("System Error!");
      if (response && response.login.result) {
        return <Redirect to={{ pathname: "/top" }} />;
      } else {
        return (
          <div className="form-signin">
            <h1 className="h3 mb-3">
              {loadingComponent}
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
                value={this.state.form.loginid || ""}
                onChange={e => this.inputChange("loginid", e.target.value)}
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
                value={"*".repeat((this.state.form.password || "").length)}
                onChange={e => this.inputChange("password", e.target.value)}
              />
            </TextField>

            <Button
              className="auto btn-primary"
              raised={true}
              onClick={() => action({ variables: this.state.form })}
            >
              {this.props.intl.formatMessage({
                id: "components.login.field.signIn"
              })}
            </Button>
          </div>
        );
      }
    };

    return (
      <div className="mdc-top-app-bar--fixed-adjust signin-component">
        {<GqlMutation mutation={mutation} form={formAction} />}
      </div>
    );
  }
}

export default injectIntl(Field);

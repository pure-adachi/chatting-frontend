import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TalkRoom from "../../components/TalkRoom";
import Login from "../../components/Login";
import Top from "../../components/Top";
import NoMatch from "../../components/NoMatch";

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/talkRooms/:id" component={TalkRoom} />
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Top} />
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter>
    );
  }
}

import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TalkRoom from "../../components/talk-room";
import Friend from "../../components/friend";
import Login from "../../components/login";
import Top from "../../components/top";
import NoMatch from "../../components/no-match";

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/talkRooms/:id" component={TalkRoom} />
          <Route path="/friends" component={Friend} />
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Top} />
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter>
    );
  }
}

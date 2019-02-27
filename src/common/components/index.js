import React from "react";
import { Switch, Route } from "react-router";

import LandingPage from "./LandingPage";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          path="/"
          render={props => <LandingPage {...props} data={this.props.data} />}
        />
      </Switch>
    );
  }
}

export default Routes;

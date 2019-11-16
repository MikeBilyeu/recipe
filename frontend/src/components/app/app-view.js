import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "../private-route";
import { checkAuthToken } from "./utils";
import Nav from "../nav";
import Home from "../home";
import Profile from "../profile";
import Auth from "../auth";
import Recipe from "../recipe";
import ScrollUp from "./scroll-up";

checkAuthToken();

const App = () => {
  return (
    <div className="paddingBottom">
      <Router>
        <ScrollUp>
          <Route exact path="/" component={Home} />
          <Switch>
            <PrivateRoute path="/profile/:page?" component={Profile} />
            <Route path="/auth" component={Auth} />
            <Route path="/recipe/:recipe_id" component={Recipe} />
          </Switch>
          <Nav />
        </ScrollUp>
      </Router>
    </div>
  );
};

export default App;
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AutomaticSetup from "../pages/AutomaticSetup";
import Control from "../pages/Control";
import Home from "../pages/Home";
import Logout from "../pages/Logout";
import Setup from "../pages/Setup";

const Routes = () => {
  return (
    <Router>
      <Route path={"/control/:deviceId"} component={Control} />
      <Route path={"/automatic/setup"} component={AutomaticSetup} />
      <Route path={"/setup"} component={Setup} />
      <Route path={"/logout"} component={Logout} />
      <Route exact path={"/"} component={Home} />
    </Router>
  );
};

export default Routes;

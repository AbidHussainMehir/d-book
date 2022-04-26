import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import AuthLayout from "layouts/Auth/Auth.js";
import AdminLayout from "./layouts/Admin/Admin";
import RTLLayout from "layouts/RTL/RTL.js";
import { ToastContainer, toast } from "react-toastify";
import Sales from "./views/pages/Sales";
import Teams from "./views/pages/Teams";
import Team from "./views/pages/Team1";
import Rewards from "./views/pages/Rewards";
import Stake from "./views/pages/Stake";
import Calculator from "./views/pages/Calculator";
import Wallet from "./views/pages/Wallet";
import Predict from "./views/pages/Predict";

import "react-toastify/dist/ReactToastify.css";
import "assets/css/nucleo-icons.css";
import "react-notification-alert/dist/animate.css";
import "assets/scss/black-dashboard-pro-react.scss?v=1.2.0";
import "assets/demo/demo.css";
import "./index.css";
ReactDOM.render(
  <Router>
    <ToastContainer />
    <Switch>
      <AdminLayout>
        <Route path="/teams/:id" exact component={Teams} />
        <Route path="/team/:id" exact component={Team} />
        <Route path="/reward" exact component={Rewards} />
        <Route path="/stake" exact component={Stake} />
        <Route path="/calculator" exact component={Calculator} />
        <Route path="/wallet" exact component={Wallet} />
        <Route path="/events" exact component={Sales} />
        <Route path="/prediction" exact component={Predict} />
        <Route path="/" exact component={Sales} />

        {/* <Redirect from="/" to="/events" /> */}
      </AdminLayout>
    </Switch>
  </Router>,
  document.getElementById("root")
);

import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";


import "assets/css/custome.css";
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import Update_Order from "views/examples/Order/Update.js";
import Update_Product from "views/examples/Product/Update.js";
import Add_Product from "views/examples/Product/Add.js";

function App() {


  return (
    <Router>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        {/* <Route path="/get_order/:id" component={Update_Order} /> */}
        {/* <Route path="/add_product"  component={Add_Product} /> */}
        {/* <Route path="/get_product/:id" component={Update_Product} /> */}
        <Redirect from="/" to="/admin/index" />
      </Switch>
    </Router>
  );
}

export default App;

import React from "react";

import List from "./List.jsx";
import Form from "./Form.jsx";
import NavBar from "./NavBar.jsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./app.css";
import ProductDetail from "./ProductDetail.jsx";

const Home = () => {
  return (
    <Router>
      <div className="home">
        <h1>Nintendo Games</h1>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <List />
          </Route>
          <Route path="/create">
            <Form title="Add Game" />
          </Route>
          <Route path="/update/:id">
            <Form title="Update Game" />
          </Route>
          <Route path="/detail/:id">
            <ProductDetail />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Home;

import React from "react";
import { Router, Route } from "react-router-dom";
import history from "../history";

import Home from "./Home";
import Register from "./auth/Register";
import Header from "./Header";
import DiaryHome from "./Diary/DiaryHome";
import ModalRoot from "../ModalRoot";
import { connect } from "react-redux";
import { hideModal } from "../actions";
import { useSpring, animated } from "react-spring";

import "../template.css";

const App = (props) => {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <Router history={history}>
          <Route
            path="/"
            exact
            render={(props) => {
              let classes = "";
              if (props.location.pathname === "/") {
                classes = "gradient";
              }
              return <Home classes={classes} {...props} />;
            }}
          />
          <Route path="/diary" exact component={DiaryHome} />
          <Route
            path="/register"
            exact
            render={(props) => <Register {...props} />}
          />
        </Router>
      </div>
      <ModalRoot hideModal={props.hideModal} />
    </React.Fragment>
  );
};

export default connect(null, { hideModal })(App);

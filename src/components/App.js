import React from "react";
import { Router, Route } from "react-router-dom";
import history from "../history";

import Home from "./Home";
import Register from "./auth/Register";
import Header from "./Header";
import { ToastContainer } from "react-toastify";

import DiaryHome from "./Diary/DiaryHome";
import ModalRoot from "../ModalRoot";
import { connect } from "react-redux";
import { hideModal } from "../actions";
import "react-toastify/dist/ReactToastify.css";

import "../template.css";

const App = (props) => {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <Router history={history}>
          <Route path="/" exact component={Home} />
          <Route path="/diary" exact component={DiaryHome} />
          <Route path="/register" exact component={Register} />
        </Router>
      </div>
      <ModalRoot hideModal={props.hideModal} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
    </React.Fragment>
  );
};

export default connect(null, { hideModal })(App);

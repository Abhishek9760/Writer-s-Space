import React from "react";
import { Link, Router } from "react-router-dom";
import history from "../history";
import Navbar from "react-bootstrap/Navbar";
import Logout from "./auth/Logout";
import Nav from "react-bootstrap/Nav";
import DiaryCreate from "./Diary/DiaryCreate";
import { Spring } from "react-spring/renderprops";
import { connect } from "react-redux";

const Header = (props) => {
  const renderAuthContent = () => {
    if (props.user) {
      return (
        <div>
          <DiaryCreate>
            <span
              className="mr-2"
              style={{ color: "white", cursor: "pointer" }}
            >
              <i className="fad fa-plus-circle mr-1"></i>Create
            </span>
          </DiaryCreate>
          <Navbar.Text>
            <i
              className="fas fa-circle mr-1"
              style={{ color: "greenyellow", fontSize: "12px" }}
            ></i>
            {props.user.username}
          </Navbar.Text>
          <Logout />
        </div>
      );
    }
  };
  return (
    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
      {(styleProps) => (
        <div style={styleProps}>
          <Navbar
            className="mb-5"
            bg="light"
            variant="light"
            collapseOnSelect
            expand="sm"
          >
            <div className="container">
              <Navbar.Brand href="/">
                <i className="fal fa-pen-square"></i> My Diary
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                  {props.isSignedIn ? (
                    renderAuthContent()
                  ) : (
                    <Router history={history}>
                      <Link className="link my-2 mr-3" to="/register">
                        Register
                      </Link>
                      <Link className="link my-2 mr-3" to="/">
                        Login
                      </Link>
                    </Router>
                  )}
                </Nav>
              </Navbar.Collapse>
            </div>
          </Navbar>
        </div>
      )}
    </Spring>
  );
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.data.isSignedIn,
    user: state.data.user,
  };
};

export default connect(mapStateToProps, {})(Header);

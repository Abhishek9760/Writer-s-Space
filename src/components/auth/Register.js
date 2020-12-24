import React from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import { Link } from "react-router-dom";
import history from "../../history";
import { Spring } from "react-spring/renderprops";

import { signUp } from "../../actions";
import RegisterForm from "./RegisterForm";

class Register extends React.Component {
  componentDidMount() {
    document.getElementsByTagName("body")[0].classList.add("gradient");
    document.getElementsByTagName("body")[0].classList.remove("list");
    let { cookies } = this.props;
    if (cookies.get("authtoken")) {
      return history.push("/");
    }
  }

  onSubmit = (formValues) => {
    this.props.signUp(formValues);
  };
  render() {
    return (
      <Spring
        from={{ opacity: 0, marginLeft: -1000 }}
        to={{ opacity: 1, marginLeft: "0" }}
      >
        {(props) => (
          <div style={props}>
            <div className="row justify-content-md-center">
              <div className="col-md-6">
                <h1 className="mb-5" style={{ fontWeight: "100" }}>
                  Register
                </h1>
                <RegisterForm onSubmit={this.onSubmit} />
                <p className="my-2">
                  Already a user?{" "}
                  <Link to="/" className="link">
                    login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}
      </Spring>
    );
  }
}

export default withCookies(connect(null, { signUp })(Register));

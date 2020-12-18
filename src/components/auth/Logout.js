import React from "react";
import history from "../../history";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import { reset } from "../../actions";

const Logout = ({ cookies, reset }) => {
  return (
    <i
      style={{ cursor: "pointer" }}
      className="my-2 ml-3 fal fa-sign-out"
      onClick={() => {
        cookies.remove("authtoken");
        reset();
        history.push("/");
      }}
      aria-hidden="true"
    ></i>
  );
};

export default withCookies(connect(null, { reset })(Logout));

import React from "react";

import { facebookLogin } from "../../actions";
import FacebookLogin from "react-facebook-login";
import { connect } from "react-redux";
// import "./GoogleLoginButton.css";
// import Spinner from "react-bootstrap/Spinner";

const FacebookLoginButton = (props) => {
  return (
    <FacebookLogin
      appId="3375293559265744"
      fields="name,email,picture"
      callback={(res) => props.facebookLogin(res)}
    />
  );
};

// const mapStateToProps = ({ diaries: { Loading } }) => {
//   return { btnLoading: Loading };
// };

export default connect(null, { facebookLogin })(FacebookLoginButton);

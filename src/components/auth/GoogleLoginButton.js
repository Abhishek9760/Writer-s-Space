import React from "react";

import { googleLogin } from "../../actions";
import GoogleLogin from "react-google-login";
import { connect } from "react-redux";
import "./GoogleLoginButton.css";
import Spinner from "react-bootstrap/Spinner";

const googleLoginFailure = (res) => {
  console.log(res);
};

const GoogleLoginButton = (props) => {
  return (
    <GoogleLogin
      clientId="984792856479-vbl9011ikj3ais9375j98f9mlik84v68.apps.googleusercontent.com"
      buttonText="Login"
      className="mb-3"
      render={(renderProps) => (
        <button
          className="google-button btn-block"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <span className="google-button__icon">
            {props.btnLoading ? (
              <Spinner
                style={{ display: "block" }}
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
            )}
          </span>
          <span className="google-button__text">Sign in with Google</span>
        </button>
      )}
      onSuccess={(res) => props.googleLogin(res)}
      onFailure={googleLoginFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
};

const mapStateToProps = ({ loading: { googleLoading } }) => {
  return { btnLoading: googleLoading };
};

export default connect(mapStateToProps, { googleLogin })(GoogleLoginButton);

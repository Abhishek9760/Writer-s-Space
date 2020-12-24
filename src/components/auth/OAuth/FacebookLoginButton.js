import React from "react";

import { facebookLogin } from "../../../actions";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { connect } from "react-redux";
import "./GoogleLoginButton.css";
import Spinner from "react-bootstrap/Spinner";
import { facebookAppId, facebookRedirectURI } from "../../../constants/oauth";

const FacebookLoginButton = (props) => {
  return (
    <FacebookLogin
      appId={facebookAppId}
      fields="name,email,picture"
      disableMobileRedirect={true}
      // redirectUri={facebookRedirectURI}
      isMobile={false}
      render={(renderProps) => (
        <button
          className="google-button btn-block"
          onClick={renderProps.onClick}
          disabled={props.btnLoading}
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
              <img
                alt="fb logo"
                src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Facebook_circle_pictogram.svg"
              />
            )}
          </span>
          <span className="google-button__text">Sign in with Facebook</span>
        </button>
      )}
      callback={(res) => props.facebookLogin(res)}
    />
  );
};

const mapStateToProps = ({ loading: { facebookLoading } }) => {
  return { btnLoading: facebookLoading };
};

export default connect(mapStateToProps, { facebookLogin })(FacebookLoginButton);

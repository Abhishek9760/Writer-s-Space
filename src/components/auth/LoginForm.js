import React from "react";
import { Field, reduxForm } from "redux-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "./Form.css";
import GoogleLogin from "react-google-login";
import { googleLogin } from "../../actions";
import { connect } from "react-redux";
class LoginForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <Alert variant="danger">
          <div className="header">{error}</div>
        </Alert>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const type = input.name === "password" ? "password" : "text";
    let classes = meta.touched && meta.invalid ? "error" : "";

    return (
      <Form.Group controlId={type}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type={type}
          autoComplete="off"
          placeholder={`${type == "text" ? "username" : type}`}
          className={classes}
          {...input}
        />
        {this.renderError(meta)}
      </Form.Group>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };
  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field
          name="username"
          component={this.renderInput}
          label="Enter Username"
        />
        <Field
          name="password"
          type="password"
          component={this.renderInput}
          label="Enter password"
        />
        <Button type="submit" varient="primary" disabled={this.props.disabled}>
          {this.props.btnText}
        </Button>
        <div>
          <GoogleLogin
            clientId="984792856479-vbl9011ikj3ais9375j98f9mlik84v68.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={(res) => this.props.googleLogin(res)}
            onFailure={(res) => this.props.googleLogin(res)}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </Form>
    );
  }
}

const validate = ({ username, password }) => {
  const errors = {};
  if (!username || username.trim() === "") {
    errors.username = "You must enter a username";
  }
  if (!password || password.trim() === "") {
    errors.password = "You must enter a password";
  }
  return errors;
};

const warn = (values) => {
  const warnings = {};
  if (values.password && values.password.length < 8) {
    warnings.username = "password is less than 8";
  }
  return warnings;
};

export default connect(null, { googleLogin })(
  reduxForm({
    form: "loginForm",
    validate: validate,
    warn: warn,
  })(LoginForm)
);

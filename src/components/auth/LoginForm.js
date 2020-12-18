import React from "react";
import { Field, reduxForm } from "redux-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "./Form.css";

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
        <Button type="submit" varient="primary">
          Login
        </Button>
      </Form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.username) {
    errors.username = "You must enter a username";
  }
  if (!formValues.password) {
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

export default reduxForm({
  form: "loginForm",
  validate: validate,
  warn: warn,
})(LoginForm);

import React from "react";
import { Field, reduxForm } from "redux-form";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { connect } from "react-redux";

class DiaryForm extends React.Component {
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
    let classes = meta.touched && meta.invalid ? "error" : "";
    let as = input.name === "title" ? "input" : "textarea";
    return (
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          as={as}
          autoComplete="off"
          placeholder={`Enter`}
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
    // getEdit(this.props.edit);
    return (
      <Form id="diary-form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="title" component={this.renderInput} label="Enter title" />
        <Field name="text" component={this.renderInput} label="Enter text" />
      </Form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }
  if (!formValues.text) {
    errors.text = "You must enter a text";
  }
  return errors;
};

export const DiaryCreateForm = reduxForm({
  form: "diaryCreateForm",
  validate: validate,
})(DiaryForm);

// const DiaryEditForm = ;

const mapStateToProps = ({ diaries: { currentDiary } }) => ({
  initialValues: {
    title: currentDiary.title,
    text: currentDiary.text,
  },
});
export const DiaryEditForm = connect(
  mapStateToProps,
  {}
)(
  reduxForm({
    form: "diaryEditForm",
    validate: validate,
    enableReinitialize: true,
  })(DiaryForm)
);

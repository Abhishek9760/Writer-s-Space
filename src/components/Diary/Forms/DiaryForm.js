import React from "react";
import { Field, reduxForm } from "redux-form";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { connect } from "react-redux";
import FieldFileInput from "./FileField";

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
          placeholder={label.replace("Enter ", "")}
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
        <Field name="image" component={FieldFileInput} name="image" />
        <Alert className="small" variant="info">
          Image of size > 1MB will take much time to upload.
        </Alert>
      </Form>
    );
  }
}

const validate = ({ title, text, image }) => {
  const errors = {};
  if (!title || title.trim() === "") {
    errors.title = "You must enter a title";
  }

  if (text && text.trim() === "") {
    errors.text = "You must enter a text";
  }
  if (!text && !image) {
    errors.text = "You must enter a text or image";
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
    image: currentDiary.image,
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

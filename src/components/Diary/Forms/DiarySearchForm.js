import React from "react";
import { Field, reduxForm } from "redux-form";
import Spinner from "react-bootstrap/Spinner";

class DiaryForm extends React.Component {
  renderInput = ({ input }) => {
    return (
      <div>
        <input
          type="text"
          autoComplete="off"
          placeholder="Search"
          className="form-control"
          {...input}
        />
      </div>
    );
  };
  render() {
    return (
      <form
        className="form mb-3 input-group-sm"
        style={{ position: "relative" }}
      >
        <Field
          name="search"
          type="text"
          placeholder="Search"
          component="input"
          autoComplete="off"
          className="form-control"
          label="Search"
        />

        {this.props.loading ? (
          <Spinner
            className="search-icon"
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : (
          <i className="fad fa-search search-icon"></i>
        )}
      </form>
    );
  }
}

let timeout = null;

export default reduxForm({
  form: "diarySearchForm",
  onChange: (values, dispatch, props) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => props.submit(), 1500);
  },
})(DiaryForm);

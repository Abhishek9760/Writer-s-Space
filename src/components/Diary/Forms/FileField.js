import React, { Component } from "react";
import Button from "react-bootstrap/Button";

export default class FieldFileInput extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const {
      input: { onChange },
    } = this.props;
    onChange(e.target.files[0]);
  }

  render() {
    const { label } = this.props; //whatever props you send to the component from redux-form Field
    return (
      <div>
        <label>{label}</label>
        <div>
          <input
            type="file"
            accept=".jpg, .png, .jpeg"
            id="file"
            onChange={this.onChange}
            hidden
          />
          <Button variant="outline-dark" size="sm" as="label" htmlFor="file">
            Add Image <i className="fad fa-upload"></i>
          </Button>
        </div>
      </div>
    );
  }
}

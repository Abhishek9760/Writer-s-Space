import React from "react";
import { createDiary, showModal, hideModal } from "../../actions";

import { connect } from "react-redux";
import { DiaryCreateForm } from "./DiaryForm";

class DiaryCreateModalButton extends React.Component {
  onSubmit = (formValues) => {
    this.props.createDiary(formValues);
    this.props.hideModal();
  };

  openCreateModal = () => {
    this.props.showModal(
      {
        open: true,
        title: "Write your day",
        form: <DiaryCreateForm onSubmit={this.onSubmit} />,
        closeModal: this.props.hideModal,
      },
      "create"
    );
  };

  render() {
    return (
      <i
        className="fal fa-plus-circle create"
        onClick={this.openCreateModal}
      ></i>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  },
  createDiary: (token, formValues, username) =>
    dispatch(createDiary(token, formValues, username)),
});

export default connect(null, mapDispatchToProps)(DiaryCreateModalButton);

import React from "react";
import { createDiary, showModal, hideModal } from "../../actions";

import { connect } from "react-redux";
import { DiaryCreateForm } from "./Forms/DiaryForm";

const diaryCreate = (props) => {
  const onSubmit = (formValues) => {
    props.createDiary(formValues);
  };

  const openCreateModal = () => {
    props.showModal(
      {
        open: true,
        title: "Write your day",
        form: <DiaryCreateForm onSubmit={onSubmit} />,
        closeModal: props.hideModal,
      },
      "create"
    );
  };

  return <span onClick={openCreateModal}>{props.children}</span>;
};

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  },
  createDiary: (token, formValues, username) =>
    dispatch(createDiary(token, formValues, username)),
});

export default connect(null, mapDispatchToProps)(diaryCreate);

import React from "react";
import { showModal, hideModal, editDiary } from "../../actions";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import { DiaryEditForm } from "./DiaryForm";

const EditDiary = (props) => {
  const openEditModal = () => {
    props.showModal(
      {
        open: true,
        title: "Edit",
        form: <DiaryEditForm onSubmit={onSubmit} />,
        closeModal: props.hideModal,
      },
      "create"
    );
  };

  const onSubmit = (formValues) => {
    let id = props.id;
    props.editDiary(id, formValues);
    props.hideModal();
  };

  return (
    <Button
      size="sm"
      onClick={openEditModal}
      className="alert-link btn btn-primary mr-2"
    >
      Edit
    </Button>
  );
};

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  },
  editDiary: (token, id, formValues, username) =>
    dispatch(editDiary(token, id, formValues, username)),
});

export default connect(null, mapDispatchToProps)(EditDiary);

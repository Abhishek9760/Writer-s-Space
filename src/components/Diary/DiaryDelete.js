import React from "react";
import Button from "react-bootstrap/Button";
import { showModal, hideModal, deleteDiary } from "../../actions";
import { connect } from "react-redux";

const DiaryDelete = (props) => {
  const onSubmit = () => {
    const id = props.id;
    props.deleteDiary(id);
  };

  const openConfirmModal = () => {
    props.showModal(
      {
        open: true,
        title: "Are you sure?",
        text: "Item will be deleted!",
        confirmAction: onSubmit,
        closeModal: props.hideModal,
        confirmBtnText: "Delete",
        cancelBtnText: "Cancel",
      },
      "confirm"
    );
  };

  return (
    <Button className="btn btn-danger" onClick={openConfirmModal}>
      Delete
    </Button>
  );
};

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  },
  deleteDiary: (token, username, id) =>
    dispatch(deleteDiary(token, username, id)),
});

export default connect(null, mapDispatchToProps)(DiaryDelete);

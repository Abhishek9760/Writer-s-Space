import React from "react";
import { connect } from "react-redux";
import DiaryModal from "./DiaryModal";

const diaryEditModal = ({ title, closeModal, form, btnLoading }) => {
  return (
    <DiaryModal title={title} closeModal={closeModal} loading={btnLoading}>
      {form}
    </DiaryModal>
  );
};

const mapStateToProps = ({ loading: { editLoading } }) => {
  return { btnLoading: editLoading };
};

export default connect(mapStateToProps, {})(diaryEditModal);

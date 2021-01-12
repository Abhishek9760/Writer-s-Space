import React from "react";
import { connect } from "react-redux";
import DiaryModal from "./DiaryModal";

const diaryCreateModal = ({ title, closeModal, form, btnLoading }) => {
  return (
    <DiaryModal title={title} closeModal={closeModal} loading={btnLoading}>
      {form}
    </DiaryModal>
  );
};

const mapStateToProps = ({ loading: { createLoading } }) => {
  return { btnLoading: createLoading };
};

export default connect(mapStateToProps, {})(diaryCreateModal);

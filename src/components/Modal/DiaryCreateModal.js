import React from "react";
import Spinner from "react-bootstrap/Spinner";

const diaryCreateModal = ({ title, closeModal, form, btnLoadingStatus }) => {
  return (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">{title}</h5>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true" onClick={closeModal}>
            &times;
          </span>
        </button>
      </div>
      <div className="modal-body">{form}</div>
      <div className="modal-footer">
        <button type="submit" form="diary-form" className="btn btn-primary">
          {btnLoadingStatus}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          data-dismiss="modal"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default diaryCreateModal;

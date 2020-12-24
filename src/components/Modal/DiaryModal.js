import React from "react";
import Spinner from "react-bootstrap/Spinner";

const diaryModal = ({ title, closeModal, children, loading }) => {
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
      <div className="modal-body">{children}</div>
      <div className="modal-footer">
        <button
          type="submit"
          form="diary-form"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner
                className="image-upload"
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span>Saving...</span>
            </>
          ) : (
            "Save Changes"
          )}
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

export default diaryModal;

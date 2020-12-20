import React from "react";
import { connect } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

const confirmModal = ({
  title,
  closeModal,
  text,
  confirmAction,
  confirmBtnText,
  cancelBtnText,
  btnLoading,
}) => {
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
      <div className="modal-body">{text}</div>
      <div className="modal-footer">
        <button
          onClick={confirmAction}
          className="btn btn-primary"
          disabled={btnLoading}
        >
          {btnLoading ? (
            <>
              <Spinner
                className="image-upload"
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </>
          ) : (
            confirmBtnText || "Yes"
          )}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          data-dismiss="modal"
          onClick={closeModal}
        >
          {cancelBtnText || "Close"}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ diaries: { Loading } }) => {
  return { btnLoading: Loading };
};

export default connect(mapStateToProps, {})(confirmModal);

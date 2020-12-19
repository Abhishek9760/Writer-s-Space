import React from "react";
import Page from "react-bootstrap/Pagination";
import { connect } from "react-redux";
import { fetchDiarys } from "../../actions";
import DiaryCreate from "./DiaryCreate";

const Pagination = (props) => {
  const getNext = () => {
    if (props.next) {
      props.fetchDiarys(true);
    }
  };

  const getPrev = () => {
    if (props.prev) {
      props.fetchDiarys(null, true);
    }
  };

  return (
    <Page
      className="my-3"
      style={{ justifyContent: props.show ? "space-between" : "center" }}
    >
      <Page.Item
        className={props.show ? "" : "d-none"}
        onClick={() => getPrev()}
        disabled={props.prev ? null : true}
      >
        <i className="fad fa-arrow-alt-left"></i>
      </Page.Item>
      <DiaryCreate>
        <i className="fal fa-plus-circle create"></i>
      </DiaryCreate>
      <Page.Item
        className={props.show ? "" : "d-none"}
        onClick={() => getNext()}
        disabled={props.next ? null : true}
      >
        <i className="fad fa-arrow-alt-right"></i>
      </Page.Item>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return { next: state.diaries.next, prev: state.diaries.previous };
};

export default connect(mapStateToProps, { fetchDiarys })(Pagination);

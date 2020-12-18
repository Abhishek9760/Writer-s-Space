import React from "react";
import Page from "react-bootstrap/Pagination";
import { connect } from "react-redux";
import { fetchDiarys } from "../../actions";

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
    <Page className="my-3" style={{ justifyContent: "space-between" }}>
      <Page.Item onClick={() => getPrev()} disabled={props.prev ? null : true}>
        <i className="fad fa-arrow-alt-left"></i>
      </Page.Item>
      <Page.Item onClick={() => getNext()} disabled={props.next ? null : true}>
        <i className="fad fa-arrow-alt-right"></i>
      </Page.Item>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return { next: state.diaries.next, prev: state.diaries.previous };
};

export default connect(mapStateToProps, { fetchDiarys })(Pagination);

import React from "react";
import DiarySearchForm from "./Forms/DiarySearchForm";
import { connect } from "react-redux";
import { searchDiarys } from "../../actions";

const DiarySearch = (props) => {
  const onSubmit = (query) => {
    props.searchDiarys(query.search);
  };
  return (
    <div>
      <DiarySearchForm loading={props.search} onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = ({ diaries: { search } }) => {
  return { search };
};

export default connect(mapStateToProps, { searchDiarys })(DiarySearch);

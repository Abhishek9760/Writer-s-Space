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
      <DiarySearchForm onSubmit={onSubmit} />
    </div>
  );
};

export default connect(null, { searchDiarys })(DiarySearch);

import {
  FETCH_DIARYS,
  FETCH_DIARY,
  EDIT_DIARY,
  SEARCH_DIARYS,
} from "../actions/types";
import _ from "lodash";
import moment from "moment";
const INITIAL_STATE = {
  searched: false,
  count: null,
  next: null,
  pervious: null,
  results: [],
  currentDiary: {},
  currentURL: null,
  editDiary: {},
};

const diaryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_DIARYS:
      action.payload.results = _.map(action.payload.results, (item) => {
        item.timestamp = moment(new Date(item.timestamp)).format(
          "[On] D MMM YYYY, [at] h:mm A"
        );
        return item;
      });
      return { ...state, ...action.payload };
    case FETCH_DIARY:
      return { ...state, currentDiary: action.payload };
    case EDIT_DIARY:
      return { ...state, editDiary: action.payload };
    case SEARCH_DIARYS:
      if (!action.payload) {
        return { ...state, searched: action.searched };
      }

      action.payload.results = _.map(action.payload.results, (item) => {
        item.timestamp = moment(new Date(item.timestamp)).format(
          "[On] D MMM YYYY, [at] h:mm A"
        );
        return item;
      });

      return { ...state, ...action.payload, searched: action.searched };
    default:
      return state;
  }
};

export default diaryReducer;

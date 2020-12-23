import { combineReducers } from "redux";

import authReducer from "./authReducer";
import diaryReducer from "./diaryReducer";
import loaderReducer from "./loaderReducer";
import modalReducer from "./modalReducer";
import { reducer as formReducer } from "redux-form";
import currentURLReducer from "./currentURLReducer";
import { RESET } from "../actions/types";

const appReducer = combineReducers({
  data: authReducer,
  form: formReducer,
  diaries: diaryReducer,
  modal: modalReducer,
  url: currentURLReducer,
  loading: loaderReducer,
});

const rootReducer = (state, action) => {
  if (action.type === RESET) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;

import { combineReducers } from "redux";

import authReducer from "./authReducer";
import diaryReducer from "./diaryReducer";
import modalReducer from "./modalReducer";
import { reducer as formReducer } from "redux-form";
import currentURLReducer from "./currentURLReducer";

const appReducer = combineReducers({
  data: authReducer,
  form: formReducer,
  diaries: diaryReducer,
  modal: modalReducer,
  url: currentURLReducer,
});

export default (state, action) => {
  if (action.type === "RESET") {
    state = undefined;
  }

  return appReducer(state, action);
};

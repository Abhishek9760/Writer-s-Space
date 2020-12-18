import { CURRENT_URL } from "../actions/types";
const initialState = {
  url: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_URL:
      return { url: action.payload };
    default:
      return state;
  }
};

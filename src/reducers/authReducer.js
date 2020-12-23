import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  TOK_USERNAME,
  SIGN_IN_LOADING,
} from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: false,
  user: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, user: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, user: null };
    case SIGN_UP:
      return { ...state, isSignedIn: false, user: action.payload };
    case TOK_USERNAME:
      let { token, isSignedIn, username } = action.payload;
      return { ...state, isSignedIn: isSignedIn, user: { token, username } };
    case SIGN_IN_LOADING:
      return { ...state, isSignedIn: action.isSignedIn };
    default:
      return state;
  }
};

export default authReducer;

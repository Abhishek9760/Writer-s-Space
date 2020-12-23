import { GOOGLE_LOGIN_LOADING, FACEBOOK_LOGIN_LOADING } from "../actions/types";
const initialState = {
  googleLoading: false,
  facebookLoading: false,
};

const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOOGLE_LOGIN_LOADING:
      return { ...state, googleLoading: action.googleLoading };
    case FACEBOOK_LOGIN_LOADING:
      return { ...state, facebookLoading: action.facebookLoading };
    default:
      return state;
  }
};

export default loaderReducer;

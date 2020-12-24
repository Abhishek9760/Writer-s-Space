import {
  GOOGLE_LOGIN_LOADING,
  FACEBOOK_LOGIN_LOADING,
  SEARCH_LOADING,
  CREATE_LOADING,
  EDIT_LOADING,
  DELETE_LOADING,
  SIGN_IN_LOADING,
  REGISTER_LOADING,
} from "../actions/types";
const initialState = {
  googleLoading: false,
  facebookLoading: false,
  searchLoading: false,
  createLoading: false,
  deleteLoading: false,
  editLoading: false,
  signInLoading: false,
  registerLoading: false,
};

const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOOGLE_LOGIN_LOADING:
      return { ...state, googleLoading: action.loading };
    case FACEBOOK_LOGIN_LOADING:
      return { ...state, facebookLoading: action.loading };
    case SEARCH_LOADING:
      return { ...state, searchLoading: action.loading };
    case CREATE_LOADING:
      return { ...state, createLoading: action.loading };
    case DELETE_LOADING:
      return { ...state, deleteLoading: action.loading };
    case EDIT_LOADING:
      return { ...state, editLoading: action.loading };
    case SIGN_IN_LOADING:
      return { ...state, signInLoading: action.loading };
    case REGISTER_LOADING:
      return { ...state, registerLoading: action.loading };
    default:
      return state;
  }
};

export default loaderReducer;

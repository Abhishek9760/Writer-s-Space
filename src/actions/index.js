import axios from "../utils/DiaryApi";
import history from "../history";
import {
  SIGN_IN,
  SIGN_IN_LOADING,
  SIGN_UP,
  SHOW_MODAL,
  HIDE_MODAL,
  CURRENT_URL,
  TOK_USERNAME,
  FETCH_DIARYS,
  FETCH_DIARY,
  SEARCH_DIARYS,
  SEARCH_LOADING,
  RESET,
  EDIT_DIARY,
} from "./types";
import FormData from "form-data";

export const showModal = ({ modalProps, modalType }) => (dispatch) => {
  dispatch({
    type: SHOW_MODAL,
    modalProps,
    modalType,
  });
};

export const hideModal = () => (dispatch) => {
  dispatch({
    type: HIDE_MODAL,
  });
};

export const reset = () => (dispatch) => {
  dispatch({
    type: RESET,
  });
};

export const signIn = (formValues) => async (dispatch) => {
  dispatch({ type: SIGN_IN_LOADING, isSignedIn: "loading" });
  try {
    const response = await axios.post("/auth/", { ...formValues });
    dispatch({ type: SIGN_IN, payload: response.data });
    history.push("/diary");
  } catch (error) {
    dispatch({ type: SIGN_IN_LOADING, isSignedIn: "false" });
    if (error.response.status == 401) {
      dispatch(
        showModal({
          modalProps: {
            open: true,
            title: "Invalid Credentials",
            message: "Username or Password is incorrect.",
            closeModal: () => dispatch(hideModal()),
          },
          modalType: "alert",
        })
      );
    }
  }
};

export const saveTokAndUsername = (token, username) => (dispatch) => {
  dispatch({
    type: TOK_USERNAME,
    payload: {
      token,
      username,
      isSignedIn: true,
    },
  });
};

export const signUp = (formValues) => async (dispatch) => {
  const response = await axios.post("/auth/register/", { ...formValues });
  dispatch({ type: SIGN_UP, payload: response.data });
  history.push("/");
};

export const currentURL = (url) => (dispatch) => {
  dispatch({
    type: CURRENT_URL,
    payload: url,
  });
};

export const searchDiarys = (query) => async (dispatch, getState) => {
  dispatch({ type: SEARCH_LOADING, search: true });
  if (!query) {
    return dispatch(fetchDiarys());
  }
  let token = getState().data.user.token;
  let username = getState().data.user.username;

  const response = await axios.get(
    `/user/${username}/diary/?ordering=-timestamp&q=${query}`,
    {
      headers: {
        Authorization: `JWT ${token}`,
      },
    }
  );
  dispatch({ type: SEARCH_LOADING, search: false });
  dispatch({ type: SEARCH_DIARYS, payload: response.data, searched: true });
};

export const fetchDiarys = (next = null, prev = null, mainUrl = null) => async (
  dispatch,
  getState
) => {
  let token = getState().data.user.token;
  let username = getState().data.user.username;

  let url = `/user/${username}/diary/?ordering=-timestamp`;
  if (next) {
    url = getState().diaries.next;
    dispatch(fetchDiary(null, true));
  }
  if (prev) {
    url = getState().diaries.previous;
    dispatch(fetchDiary(null, true));
  }
  if (mainUrl) {
    url = mainUrl;
  }
  dispatch(currentURL(url));
  let response = await axios.get(url, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  });
  let payload = response.data;
  dispatch({ type: SEARCH_DIARYS, searched: false });
  dispatch({ type: SEARCH_LOADING, search: false });
  dispatch({ type: FETCH_DIARYS, payload: payload });
};

export const fetchDiary = (id = null, empty = false) => async (
  dispatch,
  getState
) => {
  let currentDiary = getState().diaries.currentDiary;
  if (currentDiary && currentDiary.id === id) {
    return;
  }
  if (empty) {
    return dispatch({ type: FETCH_DIARY, payload: {} });
  }
  let token = getState().data.user.token;
  try {
    const response = await axios.get(`/diary/${id}/`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    dispatch({ type: FETCH_DIARY, payload: response.data });
  } catch {
    dispatch({ type: FETCH_DIARY, payload: {} });
  }
};

export const createDiary = (formValues) => async (dispatch, getState) => {
  let token = getState().data.user.token;
  let data = new FormData();
  data.append("title", formValues.title);
  data.append("text", formValues.text);
  if (formValues.image) {
    data.append("image", formValues.image);
  }
  // for (var pair of data.entries()) {
  //   console.log(pair[0] + ", " + pair[1]);
  // }
  await axios.post("/diary/", data, {
    headers: {
      Authorization: `JWT ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  dispatch(fetchDiarys());
  dispatch(hideModal());
};

export const deleteDiary = (id) => async (dispatch, getState) => {
  let token = getState().data.user.token;
  let username = getState().data.user.username;

  await axios.delete(`/diary/${id}/`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  });
  dispatch(hideModal());
  dispatch(fetchDiarys());
  dispatch(fetchDiary(null, true));
};

export const editDiary = (id, formValues) => async (dispatch, getState) => {
  let token = getState().data.user.token;
  let data = new FormData();
  data.append("title", formValues.title);
  data.append("text", formValues.text);
  if (formValues.image && typeof formValues.image !== "string") {
    data.append("image", formValues.image);
  }
  const response = await axios.put(`/diary/${id}/`, data, {
    headers: {
      Authorization: `JWT ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  const mainUrl = getState().url.url;
  dispatch({ type: EDIT_DIARY, payload: response.data });
  dispatch(fetchDiarys(null, null, mainUrl));
  dispatch(fetchDiary(id));
};

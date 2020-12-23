import axios from "../utils/DiaryApi";
import history from "../history";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import {
  clientID,
  clientSecret,
  googleClientID,
  googleClientSecret,
  facebookClientID,
  facebookClientSecret,
} from "./cred";
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
  LOADING,
  GOOGLE_LOGIN_LOADING,
  FACEBOOK_LOGIN_LOADING,
} from "./types";
import { info, success, dark } from "./toasts";
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

export const facebookLogin = (response) => async (dispatch) => {
  dispatch({ type: FACEBOOK_LOGIN_LOADING, facebookLoading: true });
  console.log("logging...");
  axios
    .post("/auth/convert-token/", {
      token: response.accessToken,
      backend: "facebook",
      grant_type: "convert_token",
      client_id: facebookClientID,
      client_secret: facebookClientSecret,
    })
    .then((res) => {
      dispatch({ type: FACEBOOK_LOGIN_LOADING, facebookLoading: false });
      const cookies = new Cookies();
      const token = res.data.access_token;
      const username = response.name.replaceAll(" ", "");
      cookies.set("authtoken", token + "$" + username);
      dark("Welcome 😊");
      dispatch({ type: LOADING, Loading: false });
      console.log("redirecting..");
      return history.push("/diary");
    })
    .catch((err) => {
      dispatch({ type: FACEBOOK_LOGIN_LOADING, facebookLoading: false });
    });
};

export const googleLogin = (response) => async (dispatch) => {
  dispatch({ type: GOOGLE_LOGIN_LOADING, googleLoading: true });
  axios
    .post("/auth/convert-token/", {
      token: response.accessToken,
      backend: "google-oauth2",
      grant_type: "convert_token",
      client_id: googleClientID,
      client_secret: googleClientSecret,
    })
    .then((res) => {
      const username = response.profileObj.email.split("@")[0];
      const token = res.data.access_token;
      console.log("setting cookies..");
      const cookies = new Cookies();
      console.log(cookies);
      cookies.set("authtoken", token + "$" + username);
      dark("Welcome 😊");
      dispatch({ type: GOOGLE_LOGIN_LOADING, googleLoading: false });
      return history.push("/diary");
    })
    .catch((err) => {
      dark("Some error occured");
      dispatch({ type: GOOGLE_LOGIN_LOADING, googleLoading: false });
    });
};
export const signIn = (formValues) => async (dispatch) => {
  dispatch({ type: SIGN_IN_LOADING, isSignedIn: "loading" });
  try {
    const response = await axios.post("/auth/token/", {
      ...formValues,
      client_id: clientID,
      client_secret: clientSecret,
      grant_type: "password",
    });
    dark("Welcome 😊");
    dispatch({
      type: SIGN_IN,
      payload: {
        token: response.data.access_token,
        username: formValues.username,
      },
    });
    history.push("/diary");
  } catch (error) {
    dispatch({ type: SIGN_IN_LOADING, isSignedIn: false });
    if (error.response.status === 400) {
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
  dark("Registered Successfully.");
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
        Authorization: `Bearer ${token}`,
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
      Authorization: `Bearer ${token}`,
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
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: FETCH_DIARY, payload: response.data });
  } catch {
    dispatch({ type: FETCH_DIARY, payload: {} });
  }
};

export const createDiary = (formValues) => async (dispatch, getState) => {
  let token = getState().data.user.token;
  dispatch(hideModal());
  dispatch({ type: LOADING, Loading: true });
  let data = new FormData();
  data.append("title", formValues.title);
  if (formValues.text) {
    data.append("text", formValues.text);
  }
  if (formValues.image) {
    data.append("image", formValues.image);
  }
  // for (var pair of data.entries()) {
  //   console.log(pair[0] + ", " + pair[1]);
  // }
  let toastId = null;

  axios
    .post("/diary/", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let progress = loaded / total;
        if (toastId === null) {
          toastId = toast.info("uploading..", { progress: progress });
        } else {
          toast.update(toastId, { progress: progress });
        }
      },
    })
    .then(() => {
      if (toastId) {
        toast.done(toastId);
      }
      if (formValues.image) {
        success("Image upload complete.");
      }
      dispatch({ type: LOADING, Loading: false });

      dispatch(fetchDiarys());
    });
};

export const deleteDiary = (id) => async (dispatch, getState) => {
  let token = getState().data.user.token;
  dispatch(hideModal());
  dispatch({ type: LOADING, Loading: true });
  await axios.delete(`/diary/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  success("Deleted successfully.");
  dispatch({ type: LOADING, Loading: false });
  dispatch(fetchDiarys());
  dispatch(fetchDiary(null, true));
};

export const editDiary = (id, formValues) => async (dispatch, getState) => {
  let token = getState().data.user.token;
  let data = new FormData();
  dispatch(hideModal());
  data.append("title", formValues.title);
  if (formValues.text) {
    data.append("text", formValues.text);
  }
  if (formValues.image && typeof formValues.image !== "string") {
    data.append("image", formValues.image);
  }

  if (!formValues.text && typeof formValues.image === "string") {
    return dispatch(hideModal());
  }
  dispatch({ type: LOADING, Loading: true });
  let toastId = null;

  const response = await axios.put(`/diary/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      let progress = loaded / total;
      if (toastId === null) {
        toastId = toast.info("saving...", { progress: progress });
      } else {
        toast.update(toastId, { progress: progress });
      }
    },
  });
  if (toastId) {
    toast.done(toastId);
  }
  success("Saved");
  dispatch({ type: LOADING, Loading: false });
  const mainUrl = getState().url.url;
  dispatch({ type: EDIT_DIARY, payload: response.data });
  dispatch(fetchDiarys(null, null, mainUrl));
  dispatch(fetchDiary(id));
};

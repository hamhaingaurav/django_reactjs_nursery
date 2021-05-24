import axios from "axios";

import {
  SIGNIN_API,
  SIGNUP_API,
  SIGNOUT_API,
  USER_DETAIL_API,
} from "../../api";
import {
  USER_LOADING,
  USER_LOADING_SUCCESS,
  USER_LOADING_FAIL,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
} from "../actions/types";

// Setup config with token - helper function
export const tokenConfig = (accessToken) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // if token add it to headers
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
};

// Load User during app loading
export const loadUser = () => (dispatch, getState) => {
  // USER LOADING
  dispatch({
    type: USER_LOADING,
  });

  // GET TOKEN FROM STATE
  const accessToken = getState().auth.access;

  axios
    .get(USER_DETAIL_API, tokenConfig(accessToken))
    .then((res) => {
      dispatch({
        type: USER_LOADING_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: USER_LOADING_FAIL,
      });
    });
};

// Signin
export const signIn = (email, password) => (dispatch) => {
  axios
    .post(
      SIGNIN_API,
      JSON.stringify({
        email,
        password,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: SIGNIN_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: SIGNIN_FAIL,
        });
      }
    });
};

// Signup
export const signUp = (credentials) => (dispatch) => {
  axios
    .post(SIGNUP_API, JSON.stringify(credentials), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      if (res.status === 201) {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: SIGNUP_FAIL,
        });
      }
    });
};

// Signout
export const signOut = () => (dispatch, getState) => {
  axios
    .post(SIGNOUT_API, {
      refresh_token: getState().auth.refresh,
    })
    .then((res) => {
      dispatch({
        type: SIGNOUT_SUCCESS,
      });
    });
};

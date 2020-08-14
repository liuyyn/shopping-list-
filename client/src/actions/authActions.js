import axios from "axios";
import { returnErrors } from "./errorActions";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../actions/types";

// check token and load user
export const loadUser = () => (dispatch, getState) => {
  // doing async request so need to add dispatch to argument

  // User loading
  dispatch({ type: USER_LOADING }); // calling action function USER_LOADING to change isLoading value to TRUE

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status)); // (msg, status)
      dispatch({
        type: AUTH_ERROR, // call case of AUTH_ERROR in authReducer which will set everything to null
      });
    });
};

// Register user (POST request to 'api/user' to add user)
export const register = ({ name, email, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // Request body
  const body = JSON.stringify({ name, email, password });

  axios
    .post("/api/users", body, config)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data, // user data and token
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// logout user
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // get token from localStorage
  const token = getState().auth.token; // getting token from redux Store {...store, auth:{...state, token:""}

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // if there is a token, add it to headers
  if (token) {
    config.headers["x-auth-token"] = token; // will be needed to validate user in /middleware/auth
  }

  return config;
};

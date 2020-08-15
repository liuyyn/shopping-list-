import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getItems = () => (dispatch) => {
  // calling setItemsLoading() to keep track of when the data is fetched from the database
  dispatch(setItemsLoading()); // to call the setItensLoading() function as a redux action, we need to wrap it inside dispatch to be able send the action to the reducer that handles that action and update the redux store's state

  // make GET items request to backend
  axios // axios replaces curl or postman -- able to send request to backend
    // .get() returns a promise
    .get("/api/items") // making a GET request to backend server of http://localhost:5000/api/items (added "proxy":"http://localhost:5000" so we don't need to specify the full url)
    .then((res) =>
      // sending action to the reducer to update the Store
      dispatch({
        // wrapping the action inside a dispatch
        type: GET_ITEMS,
        payload: res.data, // data that comes in from the backend when we hit /api/items endpoint
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItem = (item) => (dispatch, getState) => {
  // POST item request (add item)
  axios
    .post("api/items", item, tokenConfig(getState))
    .then((res) =>
      // sending to reducer the object inside dispatch
      dispatch({
        type: ADD_ITEM,
        payload: res.data, //res.data is the new added item; from post request of backend, returns the new added item
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteItem = (id) => (dispatch, getState) => {
  // DELETE item request
  axios.delete(`api/items/${id}`, tokenConfig(getState)).then((res) =>
    dispatch({
      type: DELETE_ITEM,
      payload: id,
    })
  );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};

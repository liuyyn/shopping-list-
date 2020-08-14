import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";
import axios from "axios";

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
    );
};

export const addItem = (item) => (dispatch) => {
  // POST item request (add item)
  axios.post("api/items", item).then((res) =>
    // sending to reducer the object inside dispatch
    dispatch({
      type: ADD_ITEM,
      payload: res.data, //res.data is the new added item; from post request of backend, returns the new added item
    })
  );
};

export const deleteItem = (id) => (dispatch) => {
  // DELETE item request
  axios.delete(`api/items/${id}`).then((res) =>
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

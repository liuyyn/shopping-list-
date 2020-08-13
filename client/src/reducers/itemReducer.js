// reducer returns the new state
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
} from "../actions/types";

const initialState = {
  items: [],
  loading: false, //fetching data from db could take couple seconds to get, the loading value will be set to true while fetching data, set back to false when got data
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload, // action.payload is the data got from the backend server response after GET request has been made
        loading: false, // before making the request, we set loading to true in the getItems action function
      };
    case DELETE_ITEM:
      return {
        ...state, // we want whatever is in the state but replacing old state.items with the items: below
        items: state.items.filter((item) => item._id !== action.payload), // whatever item we clicked on will be deleted from the array of items
      };
    case ADD_ITEM:
      return {
        ...state, // spread operator(...) is making a copy of the state because the redux Store's state is immutable
        items: [action.payload, ...state.items], // action.payload is the newItem to add
      };
    case ITEMS_LOADING:
      return {
        // change the state's loading to true
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}

// by running the action function (getItems, deleteItems, etc), it will dispatch (send) the action type to the reducer which will take it as an argument along with the state and return the new state that will match the action type

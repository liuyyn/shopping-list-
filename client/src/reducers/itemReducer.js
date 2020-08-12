// reducer returns the new state
import { v4 as uuid } from "uuid";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from "../actions/types";

const initialState = {
  items: [
    { id: uuid(), name: "Eggs" },
    { id: uuid(), name: "Milk" },
    { id: uuid(), name: "Steak" },
    { id: uuid(), name: "Water" },
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
      };
    case DELETE_ITEM:
      return {
        ...state, // we want whatever is in the state but replacing old state.items with the items: below
        items: state.items.filter((item) => item.id !== action.payload), // whatever item we clicked on will be deleted from the array of items
      };
    case ADD_ITEM:
      return {
        ...state, // spread operator(...) is making a copy of the state because the redux Store's state is immutable
        items: [action.payload, ...state.items], // action.payload is the newItem to add
      };
    default:
      return state;
  }
}

// by running the action function (getItems, deleteItems, etc), it will dispatch (send) the action type to the reducer which will take it as an argument along with the state and return the new state that will match the action type

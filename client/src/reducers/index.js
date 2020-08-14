// rootReducer is to bring together all of our other reducers
// Reducer: function that takes a state and an action and returns a NEW state
import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  item: itemReducer,
  error: errorReducer,
  auth: authReducer,
});

export default rootReducer;

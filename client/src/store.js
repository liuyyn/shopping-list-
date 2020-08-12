import { createStore, applyMiddleware, compose } from "redux"; // to use Thunk (which is a piece of Middleware) we will need to wrap it inside the applyMiddleware method; top use the redux tools along with applyMiddleware, we will need compose to wrap them
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware)),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // so we can see the redux store with redux devtools
);

export default store;

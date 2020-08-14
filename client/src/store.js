import { createStore, applyMiddleware, compose } from "redux"; // to use Thunk (which is a piece of Middleware) we will need to wrap it inside the applyMiddleware method; to use the redux tools along with applyMiddleware, we will need compose to wrap them
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk]; // thunk allows us to make async request

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools e.g. so we can see the redux store with redux devtools

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;

import React from "react";
import { Container } from "reactstrap";
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import ItemModal from "./components/itemModal";

import { loadUser } from "./actions/authActions"; // load this every time app mounts

// in order to use the redux store in our app, we need to bring in the Provider from react-redux (package that binds react and redux together)
import { Provider } from "react-redux"; // binds react and reduc together
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css"; // bootstrap is now included in the app by importing this
import "./App.css";
import { Component } from "react";

class App extends Component {
  componentDidMount() {
    // access dispatch method from the store and call loadUser everytime the App mounts
    store.dispatch(loadUser());
  }
  render() {
    return (
      // to be able to use store in our app, wrap it inside a <Provider></Provider>
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <ItemModal />
            <ShoppingList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;

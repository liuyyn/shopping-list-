import React, { Component } from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux"; // allows us to get state from redux into our react component
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class ShoppingList extends Component {
  // lifecycle method that runs when the compnent mounts
  componentDidMount() {
    this.props.getItems(); // calling the getItems action function everytime the component mounts which will add the items from db to the redux store so we can use it with react
  }

  onDeleteClick = (id) => {
    this.props.deleteItem(id); // by running the action function (getItems, deleteItems, etc), it will dispatch (send) the action type to the reducer which will take it as an argument along with the state and return the new state that will match the action type
  };

  render() {
    const { items } = this.props.item; // destructuring: item represents the entire state object; items is a key value of the state which maps to the shoppingList array

    return (
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="dark">
              <ListGroupItem>
                {this.props.isAuthenticated ? (
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, _id)} // binding this to the id from .map({id, name}) method above
                  >
                    &times;
                  </Button>
                ) : null}
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    );
  }
}

// validating the ShoppingList component's props
ShoppingList.propTypes = {
  // bringing in an action from redux will be stored as props and we can access it as this.props.getItems because of the matchDispatchToProps function as argument to the connect method from the react-redux package which allows us to use the redux store (state) in our react compnents by accessing them via props
  getItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};

// determines what state is passed to our component via props
const mapStateToProps = (state) => ({
  // we can now access everything inside this object via this.props.item, this.props.xxx, etc.
  item: state.item, // using state.item because item is what we called it in our rootReducer (reducer/index.js)
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList); // connect allows us to get state from redux into our react component
// mapStateToProps allows us to take pass pass props to our component and use that prop as State

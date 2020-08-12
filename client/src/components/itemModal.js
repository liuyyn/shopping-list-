import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";

class ItemModal extends Component {
  state = {
    // we have a state here that only belogs to the component itself and not connected to the store because we don't need to access the data in the entire application
    modal: false,
    name: "",
  };

  // opening and closing the Modal
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value, // setting the state's value to the input's value
    });
  };

  // handling onSubmit of button for adding an item
  onSubmit = (e) => {
    e.preventDefault(); // preventing the webpage to reload everytime we hit submit

    const newItem = {
      id: uuid(),
      name: this.state.name, // this.state.name handled by method this.onChange by setting this.state.name to input value (for ADD_ITEM action)
    };

    // adding newItem to the redux Store via addItem action
    this.props.addItem(newItem); // by calling the addItem action function we dispatch the action and send it to the reducer which will update the store with the appropriate action.type case

    // close modal by clicking the button
    this.toggle();
  };

  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          Add Item
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  // putting name here allows us to access the name associated to this input with event handle event.target.name (in this case e.targer.name=name)
                  name="name"
                  id="item"
                  placeholder="Add shopping item"
                  onChange={this.onChange}
                ></Input>
                <Button
                  color="dark"
                  style={{ marginTop: "2rem" }}
                  // display as a block
                  block
                >
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

ItemModal.propTypes = {
  addItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { addItem })(ItemModal); // using connect because we are using redux in this component i.e. called a container

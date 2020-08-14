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
  NavLink,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class RegisterModal extends Component {
  state = {
    // we have a state here that only belogs to the component itself and not connected to the store because we don't need to access the data in the entire application
    modal: false,
    name: "",
    email: "",
    password: "",
    msg: null,
  };

  componentDidUpdate(prevProps, nextProps) {
    const { error, isAuthenticated } = this.props; // destructuring this.props i.e. doing error = this.props.error

    if (error !== prevProps.error) {
      // check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // close modal if modal open && user authenticated
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle(); // close modal
      }
    }
  }

  // opening and closing the Modal
  toggle = () => {
    this.props.clearErrors(); // clear the errors
    this.setState({
      modal: !this.state.modal, // close/open modal
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value, // setting the state's value to the input's value
    });
  };

  // handling onSubmit of button for adding an item
  onSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = this.state;

    // create user object
    const newUser = {
      name,
      email,
      password,
    };

    // attempt to register user
    this.props.register(newUser);
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  // putting name here allows us to access the name associated to this input with event handle event.target.name (in this case e.targer.name=name)
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={this.onChange}
                  className="mb-3"
                ></Input>

                <Label for="email">Email</Label>
                <Input
                  type="email"
                  // putting name here allows us to access the name associated to this input with event handle event.target.name (in this case e.targer.name=name)
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={this.onChange}
                  className="mb-3"
                ></Input>

                <Label for="password">Password</Label>
                <Input
                  type="password"
                  // putting name here allows us to access the name associated to this input with event handle event.target.name (in this case e.targer.name=name)
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={this.onChange}
                  className="mb-3"
                ></Input>

                <Button
                  color="dark"
                  style={{ marginTop: "2rem" }}
                  // display as a block
                  block
                >
                  Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

RegisterModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  // gives us access to the stuff within the state of auth and error reducer
  isAuthenticated: state.auth.isAuthenticated, //want to close the modal when isAuthenticated = true
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(
  RegisterModal
); // using connect because we are using redux in this component i.e. called a container

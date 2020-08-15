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
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class LoginModal extends Component {
  state = {
    // we have a state here that only belogs to the component itself and not connected to the store because we don't need to access the data in the entire application
    modal: false,
    email: "",
    password: "",
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps, nextProps) {
    const { error, isAuthenticated } = this.props; // destructuring this.props i.e. doing error = this.props.error

    if (error !== prevProps.error) {
      // check for register error
      if (error.id === "LOGIN_FAIL") {
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

    const { email, password } = this.state;

    const user = {
      email,
      password,
    };

    // attempt to login
    this.props.login(user);
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Login
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
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
                  Login
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // gives us access to the stuff within the state of auth and error reducer
  isAuthenticated: state.auth.isAuthenticated, //want to close the modal when isAuthenticated = true
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal); // using connect because we are using redux in this component i.e. called a container

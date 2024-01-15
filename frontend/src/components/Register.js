import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import {USER_REGISTER_RESET} from '../constants/user_constants'
import Message from "./Message";
import { register } from "../actions/userActions";
import {SET_MESSAGE} from '../constants/message_constants'

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerDetails = useSelector((state) => state.registerDetails);

  const messageDetails = useSelector((state) => state.messageDetails);

  useEffect(() => {
    if (registerDetails) {
      if (registerDetails.message) {
        if (registerDetails.message.msg === "New user is created") {
          console.log("meesage = ", registerDetails.message.msg)
          console.log("New set meesage = ", registerDetails.message.msg)
          dispatch({type: SET_MESSAGE, message: registerDetails.message.msg, variant:"success"})
          navigate("/login");
          dispatch({type: USER_REGISTER_RESET})

        }
      }
      if (registerDetails.error) {
        setMessage(registerDetails.error.email[0]);
      }
    }
  }, [registerDetails]);

  const SubmitHandler = (e) => {
    e.preventDefault();

    if (password != password2) {
      setMessage("Password and Confirm Password does not match");
    } else {
      dispatch(register(name, email, password, password2));
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {message && <Message variant="danger" children={message}>{message}</Message>}
      <Form onSubmit={SubmitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="passwordConfirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br className="br"></br>
        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>
    </FormContainer>
  );
}

export default RegisterScreen;

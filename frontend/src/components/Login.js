import React, { useState, useEffect } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Message from "./Message";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userList);
  const { userInfo, error } = userLogin;

  const messageDetails = useSelector((state) => state.messageDetails)

  //console.log("Error = ", error)

  useEffect(() => {
    if (error) {
      setMessage(error.errors.non_field_errors[0])
    }
    if (userInfo) {
      if (userInfo.user_type === "customer") {
        navigate("/home")
      }
      if (userInfo.user_type === "admin") {
        navigate("/admin-home")
      }
    }
  }, [userInfo, error]);

  const SubmitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>LogIn</h1>
      {messageDetails.message && <Message></Message>}
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={SubmitHandler}>
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
        <br className="br"></br>
        <Button type="submit" variant="primary">
          Login
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New User ? <Link to="/register">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default Login;

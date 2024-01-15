import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../actions/categoryActions";
import {CATEGORY_CREATE_RESET} from '../constants/category_constants'
import {SET_MESSAGE} from '../constants/message_constants'

export default function CategoryForm() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const categoryDetails = useSelector((state) => state.categoryDetails);
  
    
  useEffect(() => {
    if (categoryDetails.loading == false && categoryDetails.category) {
        navigate("/admin-home")
        dispatch({type: CATEGORY_CREATE_RESET})
        dispatch({type: SET_MESSAGE, message: "Category created", variant: "success"})
    }

  }, [dispatch, categoryDetails]);

  const SubmitHandler = (e) => {
    e.preventDefault();
    dispatch(createCategory(name, desc));
  };
  return (
    <FormContainer>
      <h1>Create Category</h1>
      <Form onSubmit={SubmitHandler}>
        <Form.Group controlId="Name">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="Description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br className="br"></br>

        <Button type="submit" variant="primary" onClick={SubmitHandler}>
          Create
        </Button>
      </Form>
    </FormContainer>
  );
}

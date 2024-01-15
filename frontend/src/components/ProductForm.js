import React, { useState, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../actions/categoryActions";
import {createProduct} from '../actions/productActions'
import { SET_MESSAGE } from "../constants/message_constants";
import Loader from "./Loader";
import Message from "./Message";

export default function CategoryForm() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0.0);
  const [qty, setQty] =  useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [formdata, setFormData] =  useState(new FormData()); 
  

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoryDetails = useSelector((state) => state.categoryListDetails);
  const productCreateDetails =  useSelector((state) => state.productCreateDetails);

  const { loading, categories, error } = categoryDetails;
  

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    const { success, product} = productCreateDetails;
    if (success === true) {
        dispatch({type: SET_MESSAGE, message: "Product is created", variant: "succes"})
        navigate('/admin-home')
    }
  }, [productCreateDetails])

  const ImageHandler = (e) => {
    const selectedFile = e.target.files[0]
    formdata.append('image', selectedFile)
  }

  const SubmitHandler = (e) => {
    e.preventDefault();
    formdata.append('name', name);
    formdata.append('brand', brand);
    formdata.set('price', price);
    formdata.set('category_name', category)
    formdata.set('qty', qty)

    dispatch(createProduct(formdata));
  };
  return (
    <FormContainer>
      <h1>Create Product</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Form onSubmit={SubmitHandler}>
          <Form.Group controlId="Name">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              required
              type="name"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="Brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="formBasicSelect">
            <Form.Label>Category Type</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              {categoryDetails.categories ? (
                categoryDetails.categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))
              ) : (
                <option value="Loading..">Loading..</option>
              )}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Image:</Form.Label>
            <InputGroup>
              <Form.Control type="file" onChange={ImageHandler}/>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="Price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="Quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Quantity"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <br className="br"></br>

          <Button type="submit" variant="primary" onClick={SubmitHandler}>
            Create
          </Button>
        </Form>
      )}
    </FormContainer>
  );
}

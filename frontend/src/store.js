import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import {productListReducer, productDetailsReducer, productCreateReducer} from './reducers/productReducers'
import {createCategoryReducer, getCategoriesListReducer} from './reducers/categroyReducers'
import {messageReducer} from './reducers/messageReducers'

const reducer = combineReducers({
  userList: userLoginReducer,
  messageDetails: messageReducer,
  productsList: productListReducer,
  productDetails: productDetailsReducer,
  registerDetails: userRegisterReducer,
  categoryDetails: createCategoryReducer,
  categoryListDetails: getCategoriesListReducer,
  productCreateDetails: productCreateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_RESET,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_RESET
} from "../constants/category_constants";

export const createCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_CREATE_REQUEST:
      return { loading: true };

    case CATEGORY_CREATE_SUCCESS:
      return {
        loading: false,
        category: action.payload,
      };

    case CATEGORY_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const getCategoriesListReducer = (state = {}, action) => {
    switch (action.type) {
      case CATEGORY_LIST_REQUEST:
        return { loading: true };
  
      case CATEGORY_LIST_SUCCESS:
        return {
          loading: false,
          categories: action.payload,
        };
  
      case CATEGORY_LIST_FAIL:
        return { loading: false, error: action.payload };
        
        case CATEGORY_LIST_RESET:
            return {};
   
      default:
        return state;
    }
  };

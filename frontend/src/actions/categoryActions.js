import axios from "../axiosConfig";
import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_RESET,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL
} from "../constants/category_constants";


export const createCategory = (name, desc) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_CREATE_REQUEST })
        const send_data = {"name": name, "desc": desc}
        const {data}  = await axios.post(`/base/category/`, send_data)

        dispatch({
            type: CATEGORY_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CATEGORY_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getCategories = () => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_LIST_REQUEST })

        const {data}  = await axios.get(`/base/categories/`)

        dispatch({
            type: CATEGORY_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CATEGORY_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

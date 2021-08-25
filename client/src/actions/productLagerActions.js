import axios from "axios";
import {
  PRODUCT_LAGER_LIST_FAIL,
  PRODUCT_LAGER_LIST_REQUEST,
  PRODUCT_LAGER_LIST_SUCCESS,
} from "../constants/productLagerConstants";

export const listProductLager = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LAGER_LIST_REQUEST });
    const { data } = await axios.get("/api/product/lager");
    dispatch({ type: PRODUCT_LAGER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LAGER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

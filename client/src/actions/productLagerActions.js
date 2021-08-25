import axios from "axios";
import {
  LAGER_PRODUCT_QUANTITIES_FAIL,
  LAGER_PRODUCT_QUANTITIES_REQUEST,
  LAGER_PRODUCT_QUANTITIES_SUCCESS,
  LAGER_PRODUCT_QUANTITY_FAIL,
  LAGER_PRODUCT_QUANTITY_REQUEST,
  LAGER_PRODUCT_QUANTITY_SUCCESS,
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

export const productLagerQuantity = (id) => async (dispatch) => {
  try {
    dispatch({ type: LAGER_PRODUCT_QUANTITY_REQUEST });
    const { data } = await axios.get(`/api/product/lager/${id}/quantity`);
    dispatch({ type: LAGER_PRODUCT_QUANTITY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LAGER_PRODUCT_QUANTITY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const productLagerQuantities = (ids) => async (dispatch) => {
  try {
    dispatch({ type: LAGER_PRODUCT_QUANTITIES_REQUEST });
    const { data } = await axios.post(`/api/product/lager/quantities`, ids);
    dispatch({ type: LAGER_PRODUCT_QUANTITIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LAGER_PRODUCT_QUANTITIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

import axios from "axios";
import {
  PRODUCT_EXPORT_LIST_REQUEST,
  PRODUCT_EXPORT_LIST_SUCCESS,
  PRODUCT_EXPORT_LIST_FAIL,
  PRODUCT_EXPORT_CREATE_REQUEST,
  PRODUCT_EXPORT_CREATE_SUCCESS,
  PRODUCT_EXPORT_CREATE_FAIL,
} from "../constants/productExportConstants";

export const listProductExports = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_EXPORT_LIST_REQUEST });
    const { data } = await axios.get("/api/product/exports");
    dispatch({ type: PRODUCT_EXPORT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_EXPORT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createExport = (exports) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_EXPORT_CREATE_REQUEST });
    const { data } = await axios.post("/api/product/exports", exports);
    dispatch({ type: PRODUCT_EXPORT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_EXPORT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

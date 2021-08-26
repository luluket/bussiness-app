import axios from "axios";
import {
  SALE_RECEIPT_LIST_REQUEST,
  SALE_RECEIPT_LIST_SUCCESS,
  SALE_RECEIPT_LIST_FAIL,
  SALE_RECEIPT_CREATE_REQUEST,
  SALE_RECEIPT_CREATE_SUCCESS,
  SALE_RECEIPT_CREATE_FAIL,
} from "../constants/saleReceiptConstants";

export const listSaleReceipts = () => async (dispatch) => {
  try {
    dispatch({ type: SALE_RECEIPT_LIST_REQUEST });
    const { data } = await axios.get("/api/sale/receipts");
    dispatch({ type: SALE_RECEIPT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SALE_RECEIPT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createReceipt = (receipt) => async (dispatch) => {
  try {
    dispatch({ type: SALE_RECEIPT_CREATE_REQUEST });
    const { data } = await axios.post("/api/sale/receipts", receipt);
    dispatch({ type: SALE_RECEIPT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SALE_RECEIPT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

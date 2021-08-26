import {
  SALE_RECEIPT_LIST_REQUEST,
  SALE_RECEIPT_LIST_SUCCESS,
  SALE_RECEIPT_LIST_FAIL,
  SALE_RECEIPT_CREATE_REQUEST,
  SALE_RECEIPT_CREATE_SUCCESS,
  SALE_RECEIPT_CREATE_FAIL,
  SALE_RECEIPT_LIST_RESET,
  SALE_RECEIPT_CREATE_RESET,
} from "../constants/saleReceiptConstants";

export const saleReceiptListReducer = (state = { receipts: [] }, action) => {
  switch (action.type) {
    case SALE_RECEIPT_LIST_REQUEST:
      return { loading: true, receipts: [] };
    case SALE_RECEIPT_LIST_SUCCESS:
      return {
        loading: false,
        receipts: action.payload,
      };
    case SALE_RECEIPT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SALE_RECEIPT_LIST_RESET:
      return { receipts: [] };
    default:
      return state;
  }
};

export const saleReceiptCreateReducer = (state = { receipt: {} }, action) => {
  switch (action.type) {
    case SALE_RECEIPT_CREATE_REQUEST:
      return { loading: true, ...state };
    case SALE_RECEIPT_CREATE_SUCCESS:
      return { loading: false, success: true, receipt: action.payload };
    case SALE_RECEIPT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SALE_RECEIPT_CREATE_RESET:
      return { receipt: {} };
    default:
      return state;
  }
};

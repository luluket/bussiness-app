import {
  CENTRAL_RECEIPT_LIST_REQUEST,
  CENTRAL_RECEIPT_LIST_SUCCESS,
  CENTRAL_RECEIPT_LIST_FAIL,
  CENTRAL_RECEIPT_CREATE_REQUEST,
  CENTRAL_RECEIPT_CREATE_SUCCESS,
  CENTRAL_RECEIPT_CREATE_FAIL,
  CENTRAL_RECEIPT_LIST_RESET,
} from "../constants/centralReceiptConstants";

export const centralReceiptListReducer = (state = { receipts: [] }, action) => {
  switch (action.type) {
    case CENTRAL_RECEIPT_LIST_REQUEST:
      return { loading: true, receipts: [] };
    case CENTRAL_RECEIPT_LIST_SUCCESS:
      return {
        loading: false,
        receipts: action.payload,
      };
    case CENTRAL_RECEIPT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CENTRAL_RECEIPT_LIST_RESET:
      return { receipts: [] };
    default:
      return state;
  }
};

export const centralReceiptCreateReducer = (
  state = { receipt: {} },
  action
) => {
  switch (action.type) {
    case CENTRAL_RECEIPT_CREATE_REQUEST:
      return { loading: true, ...state };
    case CENTRAL_RECEIPT_CREATE_SUCCESS:
      return { loading: false, success: true, receipt: action.payload };
    case CENTRAL_RECEIPT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

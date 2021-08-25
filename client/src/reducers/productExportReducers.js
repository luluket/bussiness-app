import {
  PRODUCT_EXPORT_LIST_REQUEST,
  PRODUCT_EXPORT_LIST_SUCCESS,
  PRODUCT_EXPORT_LIST_FAIL,
  PRODUCT_EXPORT_CREATE_REQUEST,
  PRODUCT_EXPORT_CREATE_SUCCESS,
  PRODUCT_EXPORT_CREATE_FAIL,
  PRODUCT_EXPORT_LIST_RESET,
  PRODUCT_EXPORT_CREATE_RESET,
} from "../constants/productExportConstants";

export const productExportListReducer = (state = { exports: [] }, action) => {
  switch (action.type) {
    case PRODUCT_EXPORT_LIST_REQUEST:
      return { loading: true, exports: [] };
    case PRODUCT_EXPORT_LIST_SUCCESS:
      return {
        loading: false,
        exports: action.payload,
      };
    case PRODUCT_EXPORT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT_EXPORT_LIST_RESET:
      return { exports: [] };
    default:
      return state;
  }
};

export const productExportCreateReducer = (state = { export: {} }, action) => {
  switch (action.type) {
    case PRODUCT_EXPORT_CREATE_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_EXPORT_CREATE_SUCCESS:
      return { loading: false, success: true, export: action.payload };
    case PRODUCT_EXPORT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_EXPORT_CREATE_RESET:
      return { export: {} };
    default:
      return state;
  }
};

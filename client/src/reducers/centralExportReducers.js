import {
  CENTRAL_EXPORT_LIST_REQUEST,
  CENTRAL_EXPORT_LIST_SUCCESS,
  CENTRAL_EXPORT_LIST_FAIL,
  CENTRAL_EXPORT_CREATE_REQUEST,
  CENTRAL_EXPORT_CREATE_SUCCESS,
  CENTRAL_EXPORT_CREATE_FAIL,
  CENTRAL_EXPORT_LIST_RESET,
  CENTRAL_EXPORT_CREATE_RESET,
} from "../constants/centralExportConstants";

export const centralExportListReducer = (state = { exports: [] }, action) => {
  switch (action.type) {
    case CENTRAL_EXPORT_LIST_REQUEST:
      return { loading: true, exports: [] };
    case CENTRAL_EXPORT_LIST_SUCCESS:
      return {
        loading: false,
        exports: action.payload,
      };
    case CENTRAL_EXPORT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CENTRAL_EXPORT_LIST_RESET:
      return { exports: [] };
    default:
      return state;
  }
};

export const centralExportCreateReducer = (state = { export: {} }, action) => {
  switch (action.type) {
    case CENTRAL_EXPORT_CREATE_REQUEST:
      return { loading: true, ...state };
    case CENTRAL_EXPORT_CREATE_SUCCESS:
      return { loading: false, success: true, export: action.payload };
    case CENTRAL_EXPORT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case CENTRAL_EXPORT_CREATE_RESET:
      return { export: {} };
    default:
      return state;
  }
};

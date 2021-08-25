import {
  CENTRAL_IMPORT_LIST_REQUEST,
  CENTRAL_IMPORT_LIST_SUCCESS,
  CENTRAL_IMPORT_LIST_FAIL,
  CENTRAL_IMPORT_LIST_RESET,
} from "../constants/centralImportConstants";

export const centralImportListReducer = (state = { imports: [] }, action) => {
  switch (action.type) {
    case CENTRAL_IMPORT_LIST_REQUEST:
      return { loading: true, imports: [] };
    case CENTRAL_IMPORT_LIST_SUCCESS:
      return {
        loading: false,
        imports: action.payload,
      };
    case CENTRAL_IMPORT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CENTRAL_IMPORT_LIST_RESET:
      return { imports: [] };
    default:
      return state;
  }
};

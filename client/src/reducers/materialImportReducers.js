import {
  MATERIAL_IMPORT_LIST_REQUEST,
  MATERIAL_IMPORT_LIST_SUCCESS,
  MATERIAL_IMPORT_LIST_FAIL,
  MATERIAL_IMPORT_LIST_RESET,
} from "../constants/materialImportConstants";

export const materialImportListReducer = (state = { imports: [] }, action) => {
  switch (action.type) {
    case MATERIAL_IMPORT_LIST_REQUEST:
      return { loading: true, imports: [] };
    case MATERIAL_IMPORT_LIST_SUCCESS:
      return {
        loading: false,
        imports: action.payload,
      };
    case MATERIAL_IMPORT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case MATERIAL_IMPORT_LIST_RESET:
      return { imports: [] };
    default:
      return state;
  }
};

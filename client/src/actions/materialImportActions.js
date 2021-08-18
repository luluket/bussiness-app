import axios from "axios";
import {
  MATERIAL_IMPORT_LIST_REQUEST,
  MATERIAL_IMPORT_LIST_SUCCESS,
  MATERIAL_IMPORT_LIST_FAIL,
} from "../constants/materialImportConstants";

export const listMaterialImports = () => async (dispatch) => {
  try {
    dispatch({ type: MATERIAL_IMPORT_LIST_REQUEST });
    const { data } = await axios.get("/api/material/imports");
    dispatch({ type: MATERIAL_IMPORT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MATERIAL_IMPORT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

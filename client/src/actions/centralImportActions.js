import axios from "axios";
import {
  CENTRAL_IMPORT_LIST_REQUEST,
  CENTRAL_IMPORT_LIST_SUCCESS,
  CENTRAL_IMPORT_LIST_FAIL,
} from "../constants/centralImportConstants";

export const listCentralImports = () => async (dispatch) => {
  try {
    dispatch({ type: CENTRAL_IMPORT_LIST_REQUEST });
    const { data } = await axios.get("/api/central/imports");
    dispatch({ type: CENTRAL_IMPORT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CENTRAL_IMPORT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

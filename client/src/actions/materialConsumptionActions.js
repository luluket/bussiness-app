import axios from "axios";
import {
  MATERIAL_CONSUMPTION_LIST_REQUEST,
  MATERIAL_CONSUMPTION_LIST_SUCCESS,
  MATERIAL_CONSUMPTION_LIST_FAIL,
} from "../constants/materialConsumptionConstants";

export const listMaterialConsumptions = () => async (dispatch) => {
  try {
    dispatch({ type: MATERIAL_CONSUMPTION_LIST_REQUEST });
    const { data } = await axios.get("/api/material/consumptions");
    dispatch({ type: MATERIAL_CONSUMPTION_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MATERIAL_CONSUMPTION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

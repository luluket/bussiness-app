import axios from "axios";
import {
  MATERIAL_LAGER_LIST_FAIL,
  MATERIAL_LAGER_LIST_REQUEST,
  MATERIAL_LAGER_LIST_SUCCESS,
  MATERIAL_LAGER_QUANTITIES_FAIL,
  MATERIAL_LAGER_QUANTITIES_REQUEST,
  MATERIAL_LAGER_QUANTITIES_SUCCESS,
} from "../constants/materialLagerConstants";

export const listMaterialLager = () => async (dispatch) => {
  try {
    dispatch({ type: MATERIAL_LAGER_LIST_REQUEST });
    const { data } = await axios.get("/api/material/lager");
    dispatch({ type: MATERIAL_LAGER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MATERIAL_LAGER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const articleMaterialLagerQuantities = (ids) => async (dispatch) => {
  try {
    dispatch({ type: MATERIAL_LAGER_QUANTITIES_REQUEST });
    const { data } = await axios.post(`/api/material/lager/quantities`, ids);
    dispatch({ type: MATERIAL_LAGER_QUANTITIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MATERIAL_LAGER_QUANTITIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

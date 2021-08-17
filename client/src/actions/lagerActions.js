import axios from "axios";
import {
  LAGER_LIST_FAIL,
  LAGER_LIST_REQUEST,
  LAGER_LIST_SUCCESS,
  LAGER_MATERIAL_LIST_FAIL,
  LAGER_MATERIAL_LIST_REQUEST,
  LAGER_MATERIAL_LIST_SUCCESS,
} from "../constants/lagerConstants";

export const listLager = () => async (dispatch) => {
  try {
    dispatch({ type: LAGER_LIST_REQUEST });
    const { data } = await axios.get("/api/lager");
    dispatch({ type: LAGER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LAGER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listLagerMaterials = () => async (dispatch) => {
  try {
    dispatch({ type: LAGER_MATERIAL_LIST_REQUEST });
    const { data } = await axios.get("/api/lager/materials");
    dispatch({ type: LAGER_MATERIAL_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LAGER_MATERIAL_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

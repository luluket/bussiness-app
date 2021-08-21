import axios from "axios";
import {
  LAGER_LIST_FAIL,
  LAGER_LIST_REQUEST,
  LAGER_LIST_SUCCESS,
  LAGER_MATERIAL_LIST_FAIL,
  LAGER_MATERIAL_LIST_REQUEST,
  LAGER_MATERIAL_LIST_SUCCESS,
  LAGER_ARTICLE_QUANTITY_REQUEST,
  LAGER_ARTICLE_QUANTITY_SUCCESS,
  LAGER_ARTICLE_QUANTITY_FAIL,
  LAGER_ARTICLE_QUANTITIES_REQUEST,
  LAGER_ARTICLE_QUANTITIES_SUCCESS,
  LAGER_ARTICLE_QUANTITIES_FAIL,
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

export const articleLagerQuantity = (id) => async (dispatch) => {
  try {
    dispatch({ type: LAGER_ARTICLE_QUANTITY_REQUEST });
    const { data } = await axios.get(`/api/lager/${id}`);
    dispatch({ type: LAGER_ARTICLE_QUANTITY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LAGER_ARTICLE_QUANTITY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const articleLagerQuantities = (ids) => async (dispatch) => {
  try {
    dispatch({ type: LAGER_ARTICLE_QUANTITIES_REQUEST });
    const { data } = await axios.post(`/api/lager/quantities`, ids);
    dispatch({ type: LAGER_ARTICLE_QUANTITIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LAGER_ARTICLE_QUANTITIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

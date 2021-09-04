import axios from "axios";
import {
  WORKORDER_LIST_REQUEST,
  WORKORDER_LIST_SUCCESS,
  WORKORDER_LIST_FAIL,
  WORKORDER_DETAILS_REQUEST,
  WORKORDER_DETAILS_SUCCESS,
  WORKORDER_DETAILS_FAIL,
  WORKORDER_CREATE_REQUEST,
  WORKORDER_CREATE_SUCCESS,
  WORKORDER_CREATE_FAIL,
  WORKORDER_UPDATE_REQUEST,
  WORKORDER_UPDATE_SUCCESS,
  WORKORDER_UPDATE_FAIL,
} from "../constants/workorderConstants";

export const listWorkorders = () => async (dispatch) => {
  try {
    dispatch({ type: WORKORDER_LIST_REQUEST });
    const { data } = await axios.get("/api/workorders");
    dispatch({ type: WORKORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: WORKORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listWorkorderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: WORKORDER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/workorders/${id}`);
    dispatch({ type: WORKORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: WORKORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createWorkorder = (workorder) => async (dispatch) => {
  try {
    dispatch({ type: WORKORDER_CREATE_REQUEST });
    const { data } = await axios.post("/api/workorders", workorder);
    dispatch({ type: WORKORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: WORKORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateWorkorder = (workorder) => async (dispatch) => {
  try {
    dispatch({ type: WORKORDER_UPDATE_REQUEST });
    const { data } = await axios.put(
      `/api/workorders/${workorder._id}`,
      workorder
    );
    dispatch({ type: WORKORDER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: WORKORDER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

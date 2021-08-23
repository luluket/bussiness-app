import axios from "axios";
import {
  WORKORDER_LIST_REQUEST,
  WORKORDER_LIST_SUCCESS,
  WORKORDER_LIST_FAIL,
  WORKORDER_CREATE_REQUEST,
  WORKORDER_CREATE_SUCCESS,
  WORKORDER_CREATE_FAIL,
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

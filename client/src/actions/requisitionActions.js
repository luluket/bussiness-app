import axios from "axios";
import {
  REQUISITION_LIST_REQUEST,
  REQUISITION_LIST_SUCCESS,
  REQUISITION_LIST_FAIL,
  REQUISITION_LIST_RESET,
  REQUISITION_CREATE_REQUEST,
  REQUISITION_CREATE_SUCCESS,
  REQUISITION_CREATE_FAIL,
  REQUISITION_CREATE_RESET,
  REQUISITION_UNFULLFILLED_LIST_REQUEST,
  REQUISITION_UNFULLFILLED_LIST_SUCCESS,
  REQUISITION_UNFULLFILLED_LIST_FAIL,
  REQUISITION_FULLFILL_REQUEST,
  REQUISITION_FULLFILL_SUCCESS,
  REQUISITION_FULLFILL_FAIL,
} from "../constants/requisitionConstants";

export const listRequisitions = () => async (dispatch) => {
  try {
    dispatch({ type: REQUISITION_LIST_REQUEST });
    const { data } = await axios.get("/api/requisitions");
    dispatch({ type: REQUISITION_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REQUISITION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUnfullfilledRequisitions = () => async (dispatch) => {
  try {
    dispatch({ type: REQUISITION_UNFULLFILLED_LIST_REQUEST });
    const { data } = await axios.get("/api/requisitions/unfullfilled");
    dispatch({ type: REQUISITION_UNFULLFILLED_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REQUISITION_UNFULLFILLED_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createRequisition = (requisition) => async (dispatch) => {
  try {
    dispatch({ type: REQUISITION_CREATE_REQUEST });
    const { data } = await axios.post("/api/requisition", requisition);
    dispatch({ type: REQUISITION_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REQUISITION_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fullfillRequisition = (id) => async (dispatch) => {
  try {
    dispatch({ type: REQUISITION_FULLFILL_REQUEST });
    const { data } = await axios.put(`/api/requisitions/${id}/fullfill`);
    dispatch({ type: REQUISITION_FULLFILL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REQUISITION_FULLFILL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

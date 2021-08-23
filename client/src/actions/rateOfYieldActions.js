import axios from "axios";
import {
  RATE_LIST_REQUEST,
  RATE_LIST_SUCCESS,
  RATE_LIST_FAIL,
  RATE_DETAILS_REQUEST,
  RATE_DETAILS_SUCCESS,
  RATE_DETAILS_FAIL,
  RATE_CREATE_REQUEST,
  RATE_CREATE_SUCCESS,
  RATE_CREATE_FAIL,
} from "../constants/rateOfYieldConstants";

export const listRates = () => async (dispatch) => {
  try {
    dispatch({ type: RATE_LIST_REQUEST });
    const { data } = await axios.get("/api/rates");
    dispatch({ type: RATE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RATE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const listRateDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: RATE_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/rates/${id}`);
    dispatch({ type: RATE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RATE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createRate = (rate) => async (dispatch) => {
  try {
    dispatch({ type: RATE_CREATE_REQUEST });
    const { data } = await axios.post("/api/rates", rate);
    dispatch({ type: RATE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RATE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

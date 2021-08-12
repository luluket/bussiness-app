import axios from "axios";
import {
  PARTNER_LIST_REQUEST,
  PARTNER_LIST_SUCCESS,
  PARTNER_LIST_FAIL,
  PARTNER_CREATE_REQUEST,
  PARTNER_CREATE_SUCCESS,
  PARTNER_CREATE_FAIL,
  PARTNER_DETAILS_REQUEST,
  PARTNER_DETAILS_SUCCESS,
  PARTNER_DETAILS_FAIL,
} from "../constants/partnerConstants";

export const listPartners = () => async (dispatch) => {
  try {
    dispatch({ type: PARTNER_LIST_REQUEST });
    const { data } = await axios.get("/api/partners");
    dispatch({ type: PARTNER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PARTNER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPartnerDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PARTNER_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/partners/${id}`);
    dispatch({
      type: PARTNER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PARTNER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createPartner = (partner) => async (dispatch) => {
  try {
    dispatch({ type: PARTNER_CREATE_REQUEST });
    const { data } = await axios.post("/api/partners", partner);
    dispatch({ type: PARTNER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PARTNER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

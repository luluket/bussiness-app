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
  PARTNER_UPDATE_REQUEST,
  PARTNER_UPDATE_SUCCESS,
  PARTNER_UPDATE_FAIL,
  SUPPLIER_LIST_REQUEST,
  SUPPLIER_LIST_SUCCESS,
  SUPPLIER_LIST_FAIL,
  CUSTOMER_LIST_REQUEST,
  CUSTOMER_LIST_SUCCESS,
  CUSTOMER_LIST_FAIL,
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

export const updatePartner = (partner) => async (dispatch) => {
  try {
    dispatch({ type: PARTNER_UPDATE_REQUEST });
    const { data } = await axios.put(`/api/partners/${partner._id}`, partner);
    dispatch({ type: PARTNER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PARTNER_UPDATE_FAIL,
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

export const listSuppliers = () => async (dispatch) => {
  try {
    dispatch({ type: SUPPLIER_LIST_REQUEST });
    const { data } = await axios.get("/api/partners/suppliers");
    dispatch({ type: SUPPLIER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SUPPLIER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCustomers = () => async (dispatch) => {
  try {
    dispatch({ type: CUSTOMER_LIST_REQUEST });
    const { data } = await axios.get("/api/partners/customers");
    dispatch({ type: CUSTOMER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CUSTOMER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

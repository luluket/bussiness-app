import {
  RATE_LIST_REQUEST,
  RATE_LIST_SUCCESS,
  RATE_LIST_FAIL,
  RATE_LIST_RESET,
  RATE_CREATE_RESET,
  RATE_CREATE_FAIL,
  RATE_CREATE_SUCCESS,
  RATE_CREATE_REQUEST,
  RATE_DETAILS_REQUEST,
  RATE_DETAILS_SUCCESS,
  RATE_DETAILS_RESET,
  RATE_DETAILS_FAIL,
} from "../constants/rateOfYieldConstants";

export const rateListReducer = (state = { rates: [] }, action) => {
  switch (action.type) {
    case RATE_LIST_REQUEST:
      return { loading: true, rates: [] };
    case RATE_LIST_SUCCESS:
      return {
        loading: false,
        rates: action.payload,
      };
    case RATE_LIST_RESET:
      return {
        rates: [],
      };
    case RATE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const rateDetailsReducer = (state = { rate: {} }, action) => {
  switch (action.type) {
    case RATE_DETAILS_REQUEST:
      return { loading: true, ...state };
    case RATE_DETAILS_SUCCESS:
      return {
        loading: false,
        rate: action.payload,
      };
    case RATE_DETAILS_RESET:
      return {
        rate: {},
      };
    case RATE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const rateCreateReducer = (state = { rate: {} }, action) => {
  switch (action.type) {
    case RATE_CREATE_REQUEST:
      return { loading: true, ...state };
    case RATE_CREATE_SUCCESS:
      return { loading: false, success: true, rate: action.payload };
    case RATE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case RATE_CREATE_RESET:
      return { rate: {} };
    default:
      return state;
  }
};

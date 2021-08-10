import {
  PARTNER_CREATE_FAIL,
  PARTNER_CREATE_REQUEST,
  PARTNER_CREATE_RESET,
  PARTNER_CREATE_SUCCESS,
  PARTNER_LIST_FAIL,
  PARTNER_LIST_REQUEST,
  PARTNER_LIST_SUCCESS,
} from "../constants/partnerConstants";

export const partnerListReducer = (state = { partners: [] }, action) => {
  switch (action.type) {
    case PARTNER_LIST_REQUEST:
      return { loading: true };
    case PARTNER_LIST_SUCCESS:
      return { loading: false, partners: action.payload };
    case PARTNER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const partnerCreateReducer = (state = { partner: {} }, action) => {
  switch (action.type) {
    case PARTNER_CREATE_REQUEST:
      return { loading: true, ...state };
    case PARTNER_CREATE_SUCCESS:
      return { loading: false, success: true, partner: action.payload };
    case PARTNER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PARTNER_CREATE_RESET:
      return { partner: {} };
    default:
      return state;
  }
};

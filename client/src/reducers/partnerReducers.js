import {
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

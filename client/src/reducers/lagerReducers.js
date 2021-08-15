import {
  LAGER_LIST_FAIL,
  LAGER_LIST_REQUEST,
  LAGER_LIST_RESET,
  LAGER_LIST_SUCCESS,
} from "../constants/lagerConstants";

export const lagerListReducer = (state = { lager: [] }, action) => {
  switch (action.type) {
    case LAGER_LIST_REQUEST:
      return { loading: true, lager: [] };
    case LAGER_LIST_SUCCESS:
      return {
        loading: false,
        lager: action.payload,
      };
    case LAGER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case LAGER_LIST_RESET:
      return { lager: [] };
    default:
      return state;
  }
};

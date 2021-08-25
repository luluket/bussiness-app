import {
  PRODUCT_LAGER_LIST_FAIL,
  PRODUCT_LAGER_LIST_REQUEST,
  PRODUCT_LAGER_LIST_RESET,
  PRODUCT_LAGER_LIST_SUCCESS,
} from "../constants/productLagerConstants";

export const productLagerListReducer = (state = { lager: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LAGER_LIST_REQUEST:
      return { loading: true, lager: [] };
    case PRODUCT_LAGER_LIST_SUCCESS:
      return {
        loading: false,
        lager: action.payload,
      };
    case PRODUCT_LAGER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_LAGER_LIST_RESET:
      return { lager: [] };
    default:
      return state;
  }
};

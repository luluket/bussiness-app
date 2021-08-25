import {
  LAGER_PRODUCT_QUANTITIES_FAIL,
  LAGER_PRODUCT_QUANTITIES_REQUEST,
  LAGER_PRODUCT_QUANTITIES_SUCCESS,
  LAGER_PRODUCT_QUANTITY_FAIL,
  LAGER_PRODUCT_QUANTITY_REQUEST,
  LAGER_PRODUCT_QUANTITY_SUCCESS,
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

export const lagerProductQuantityReducer = (
  state = { quantity: 0 },
  action
) => {
  switch (action.type) {
    case LAGER_PRODUCT_QUANTITY_REQUEST:
      return { loading: true };
    case LAGER_PRODUCT_QUANTITY_SUCCESS:
      return {
        loading: false,
        success: true,
        quantity: action.payload,
      };
    case LAGER_PRODUCT_QUANTITY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const lagerProductQuantitiesReducer = (
  state = { quantities: [] },
  action
) => {
  switch (action.type) {
    case LAGER_PRODUCT_QUANTITIES_REQUEST:
      return { loading: true };
    case LAGER_PRODUCT_QUANTITIES_SUCCESS:
      return {
        loading: false,
        success: true,
        quantities: action.payload,
      };
    case LAGER_PRODUCT_QUANTITIES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

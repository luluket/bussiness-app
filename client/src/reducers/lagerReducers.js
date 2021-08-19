import {
  LAGER_LIST_FAIL,
  LAGER_LIST_REQUEST,
  LAGER_LIST_RESET,
  LAGER_LIST_SUCCESS,
  LAGER_MATERIAL_LIST_FAIL,
  LAGER_MATERIAL_LIST_REQUEST,
  LAGER_MATERIAL_LIST_SUCCESS,
  LAGER_ARTICLE_QUANTITY_REQUEST,
  LAGER_ARTICLE_QUANTITY_SUCCESS,
  LAGER_ARTICLE_QUANTITY_FAIL,
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

export const lagerListMaterialReducer = (state = { lager: [] }, action) => {
  switch (action.type) {
    case LAGER_MATERIAL_LIST_REQUEST:
      return { loading: true, lager: [] };
    case LAGER_MATERIAL_LIST_SUCCESS:
      return {
        loading: false,
        lager: action.payload,
      };
    case LAGER_MATERIAL_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const lagerArticleQuantityReducer = (
  state = { quantity: 0 },
  action
) => {
  switch (action.type) {
    case LAGER_ARTICLE_QUANTITY_REQUEST:
      return { loading: true };
    case LAGER_ARTICLE_QUANTITY_SUCCESS:
      return {
        loading: false,
        quantity: action.payload,
      };
    case LAGER_ARTICLE_QUANTITY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

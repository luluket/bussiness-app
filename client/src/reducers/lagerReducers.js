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
  LAGER_ARTICLE_QUANTITIES_REQUEST,
  LAGER_ARTICLE_QUANTITIES_SUCCESS,
  LAGER_ARTICLE_QUANTITIES_FAIL,
  LAGER_ARTICLE_PURCHASE_PRICES_REQUEST,
  LAGER_ARTICLE_PURCHASE_PRICES_SUCCESS,
  LAGER_ARTICLE_PURCHASE_PRICES_FAIL,
  LAGER_ARTICLE_SELLING_PRICES_FAIL,
  LAGER_ARTICLE_SELLING_PRICES_SUCCESS,
  LAGER_ARTICLE_SELLING_PRICES_REQUEST,
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
        success: true,
        quantity: action.payload,
      };
    case LAGER_ARTICLE_QUANTITY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const lagerArticleQuantitiesReducer = (
  state = { quantities: [] },
  action
) => {
  switch (action.type) {
    case LAGER_ARTICLE_QUANTITIES_REQUEST:
      return { loading: true };
    case LAGER_ARTICLE_QUANTITIES_SUCCESS:
      return {
        loading: false,
        success: true,
        quantities: action.payload,
      };
    case LAGER_ARTICLE_QUANTITIES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const lagerArticlePurchasePricesReducer = (
  state = { purchasePrices: [] },
  action
) => {
  switch (action.type) {
    case LAGER_ARTICLE_PURCHASE_PRICES_REQUEST:
      return { loading: true };
    case LAGER_ARTICLE_PURCHASE_PRICES_SUCCESS:
      return {
        loading: false,
        success: true,
        purchasePrices: action.payload,
      };
    case LAGER_ARTICLE_PURCHASE_PRICES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const lagerArticleSellingPricesReducer = (
  state = { sellingPrices: [] },
  action
) => {
  switch (action.type) {
    case LAGER_ARTICLE_SELLING_PRICES_REQUEST:
      return { loading: true };
    case LAGER_ARTICLE_SELLING_PRICES_SUCCESS:
      return {
        loading: false,
        success: true,
        sellingPrices: action.payload,
      };
    case LAGER_ARTICLE_SELLING_PRICES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

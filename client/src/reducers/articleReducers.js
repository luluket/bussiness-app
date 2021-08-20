import {
  ARTICLE_LIST_REQUEST,
  ARTICLE_LIST_SUCCESS,
  ARTICLE_LIST_FAIL,
  ARTICLE_DETAILS_REQUEST,
  ARTICLE_DETAILS_SUCCESS,
  ARTICLE_DETAILS_FAIL,
  ARTICLE_UPDATE_REQUEST,
  ARTICLE_UPDATE_SUCCESS,
  ARTICLE_UPDATE_FAIL,
  ARTICLE_CREATE_REQUEST,
  ARTICLE_CREATE_SUCCESS,
  ARTICLE_CREATE_FAIL,
  ARTICLE_UPDATE_RESET,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  MATERIAL_LIST_REQUEST,
  MATERIAL_LIST_SUCCESS,
  MATERIAL_LIST_FAIL,
} from "../constants/articleConstants";

export const articleListReducer = (state = { articles: [] }, action) => {
  switch (action.type) {
    case ARTICLE_LIST_REQUEST:
      return { loading: true, articles: [] };
    case ARTICLE_LIST_SUCCESS:
      return {
        loading: false,
        articles: action.payload,
      };
    case ARTICLE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const articleDetailsReducer = (state = { article: {} }, action) => {
  switch (action.type) {
    case ARTICLE_DETAILS_REQUEST:
      return { loading: true, ...state };
    case ARTICLE_DETAILS_SUCCESS:
      return { loading: false, article: action.payload };
    case ARTICLE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const articleCreateReducer = (state = { article: {} }, action) => {
  switch (action.type) {
    case ARTICLE_CREATE_REQUEST:
      return { loading: true, ...state };
    case ARTICLE_CREATE_SUCCESS:
      return { loading: false, success: true, article: action.payload };
    case ARTICLE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const articleUpdateReducer = (state = { article: {} }, action) => {
  switch (action.type) {
    case ARTICLE_UPDATE_REQUEST:
      return { loading: true, ...state };
    case ARTICLE_UPDATE_SUCCESS:
      return { loading: false, success: true, article: action.payload };
    case ARTICLE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ARTICLE_UPDATE_RESET:
      return { article: {} };
    default:
      return state;
  }
};

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const materialListReducer = (state = { materials: [] }, action) => {
  switch (action.type) {
    case MATERIAL_LIST_REQUEST:
      return { loading: true, materials: [] };
    case MATERIAL_LIST_SUCCESS:
      return {
        loading: false,
        materials: action.payload,
      };
    case MATERIAL_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

import {
  MATERIAL_LAGER_LIST_FAIL,
  MATERIAL_LAGER_LIST_REQUEST,
  MATERIAL_LAGER_LIST_RESET,
  MATERIAL_LAGER_LIST_SUCCESS,
  MATERIAL_LAGER_QUANTITIES_FAIL,
  MATERIAL_LAGER_QUANTITIES_REQUEST,
  MATERIAL_LAGER_QUANTITIES_SUCCESS,
} from "../constants/materialLagerConstants";

export const materialLagerListReducer = (state = { lager: [] }, action) => {
  switch (action.type) {
    case MATERIAL_LAGER_LIST_REQUEST:
      return { loading: true, lager: [] };
    case MATERIAL_LAGER_LIST_SUCCESS:
      return {
        loading: false,
        lager: action.payload,
      };
    case MATERIAL_LAGER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case MATERIAL_LAGER_LIST_RESET:
      return { lager: [] };
    default:
      return state;
  }
};

export const materialLagerQuantitiesReducer = (
  state = { quantities: [] },
  action
) => {
  switch (action.type) {
    case MATERIAL_LAGER_QUANTITIES_REQUEST:
      return { loading: true };
    case MATERIAL_LAGER_QUANTITIES_SUCCESS:
      return {
        loading: false,
        success: true,
        quantities: action.payload,
      };
    case MATERIAL_LAGER_QUANTITIES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

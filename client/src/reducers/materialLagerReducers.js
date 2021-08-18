import {
  MATERIAL_LAGER_LIST_FAIL,
  MATERIAL_LAGER_LIST_REQUEST,
  MATERIAL_LAGER_LIST_RESET,
  MATERIAL_LAGER_LIST_SUCCESS,
  MATERIAL_LAGER_MATERIAL_LIST_FAIL,
  MATERIAL_LAGER_MATERIAL_LIST_REQUEST,
  MATERIAL_LAGER_MATERIAL_LIST_SUCCESS,
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

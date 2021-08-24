import {
  MATERIAL_CONSUMPTION_LIST_REQUEST,
  MATERIAL_CONSUMPTION_LIST_SUCCESS,
  MATERIAL_CONSUMPTION_LIST_FAIL,
  MATERIAL_CONSUMPTION_LIST_RESET,
} from "../constants/materialConsumptionConstants";

export const materialConsumptionListReducer = (
  state = { consumptions: [] },
  action
) => {
  switch (action.type) {
    case MATERIAL_CONSUMPTION_LIST_REQUEST:
      return { loading: true, consumptions: [] };
    case MATERIAL_CONSUMPTION_LIST_SUCCESS:
      return {
        loading: false,
        consumptions: action.payload,
      };
    case MATERIAL_CONSUMPTION_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case MATERIAL_CONSUMPTION_LIST_RESET:
      return { consumptions: [] };
    default:
      return state;
  }
};

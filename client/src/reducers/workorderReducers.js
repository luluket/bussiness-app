import {
  WORKORDER_LIST_REQUEST,
  WORKORDER_LIST_SUCCESS,
  WORKORDER_LIST_FAIL,
  WORKORDER_CREATE_REQUEST,
  WORKORDER_CREATE_SUCCESS,
  WORKORDER_CREATE_FAIL,
  WORKORDER_LIST_RESET,
  WORKORDER_CREATE_RESET,
} from "../constants/workorderConstants";

export const workorderListReducer = (state = { workorders: [] }, action) => {
  switch (action.type) {
    case WORKORDER_LIST_REQUEST:
      return { loading: true, workorders: [] };
    case WORKORDER_LIST_SUCCESS:
      return {
        loading: false,
        workorders: action.payload,
      };
    case WORKORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case WORKORDER_LIST_RESET:
      return { workorders: [] };
    default:
      return state;
  }
};

export const workorderCreateReducer = (state = { workorder: {} }, action) => {
  switch (action.type) {
    case WORKORDER_CREATE_REQUEST:
      return { loading: true, ...state };
    case WORKORDER_CREATE_SUCCESS:
      return { loading: false, success: true, workorder: action.payload };
    case WORKORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case WORKORDER_CREATE_RESET:
      return { workorder: {} };
    default:
      return state;
  }
};

import {
  REQUISITION_LIST_REQUEST,
  REQUISITION_LIST_SUCCESS,
  REQUISITION_LIST_FAIL,
  REQUISITION_CREATE_REQUEST,
  REQUISITION_CREATE_SUCCESS,
  REQUISITION_CREATE_FAIL,
  REQUISITION_LIST_RESET,
  REQUISITION_CREATE_RESET,
  REQUISITION_UNFULLFILLED_LIST_REQUEST,
  REQUISITION_UNFULLFILLED_LIST_SUCCESS,
  REQUISITION_UNFULLFILLED_LIST_FAIL,
  REQUISITION_UNFULLFILLED_LIST_RESET,
  REQUISITION_FULLFILL_REQUEST,
  REQUISITION_FULLFILL_SUCCESS,
  REQUISITION_FULLFILL_FAIL,
} from "../constants/requisitionConstants";

export const requisitionListReducer = (
  state = { requisitions: [] },
  action
) => {
  switch (action.type) {
    case REQUISITION_LIST_REQUEST:
      return { loading: true, requisitions: [] };
    case REQUISITION_LIST_SUCCESS:
      return {
        loading: false,
        requisitions: action.payload,
      };
    case REQUISITION_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case REQUISITION_LIST_RESET:
      return { requisitions: [] };
    default:
      return state;
  }
};

export const requisitionUnfullfilledListReducer = (
  state = { requisitions: [] },
  action
) => {
  switch (action.type) {
    case REQUISITION_UNFULLFILLED_LIST_REQUEST:
      return { loading: true, requisitions: [] };
    case REQUISITION_UNFULLFILLED_LIST_SUCCESS:
      return {
        loading: false,
        requisitions: action.payload,
      };
    case REQUISITION_UNFULLFILLED_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case REQUISITION_UNFULLFILLED_LIST_RESET:
      return { requisitions: [] };
    default:
      return state;
  }
};

export const requisitionCreateReducer = (
  state = { requisition: {} },
  action
) => {
  switch (action.type) {
    case REQUISITION_CREATE_REQUEST:
      return { loading: true, ...state };
    case REQUISITION_CREATE_SUCCESS:
      return { loading: false, success: true, requisition: action.payload };
    case REQUISITION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case REQUISITION_CREATE_RESET:
      return { requisition: {} };
    default:
      return state;
  }
};

export const requisitionFullfillReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUISITION_FULLFILL_REQUEST:
      return { loading: true };
    case REQUISITION_FULLFILL_SUCCESS:
      return { loading: false, success: true };
    case REQUISITION_FULLFILL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

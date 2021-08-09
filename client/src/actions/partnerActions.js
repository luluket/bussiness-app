import axios from "axios";
import {
  PARTNER_LIST_REQUEST,
  PARTNER_LIST_SUCCESS,
  PARTNER_LIST_FAIL,
} from "../constants/partnerConstants";
export const listPartners = () => async (dispatch) => {
  try {
    dispatch({ type: PARTNER_LIST_REQUEST });
    const { data } = await axios.get("/api/partners");
    dispatch({ type: PARTNER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PARTNER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

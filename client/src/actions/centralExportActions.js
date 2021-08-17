import axios from "axios";
import {
  CENTRAL_EXPORT_LIST_REQUEST,
  CENTRAL_EXPORT_LIST_SUCCESS,
  CENTRAL_EXPORT_LIST_FAIL,
  CENTRAL_EXPORT_CREATE_REQUEST,
  CENTRAL_EXPORT_CREATE_SUCCESS,
  CENTRAL_EXPORT_CREATE_FAIL,
} from "../constants/centralExportConstants";

export const listCentralExports = () => async (dispatch) => {
  try {
    dispatch({ type: CENTRAL_EXPORT_LIST_REQUEST });
    const { data } = await axios.get("/api/central/exports");
    dispatch({ type: CENTRAL_EXPORT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CENTRAL_EXPORT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// export const createReceipt = (receipt) => async (dispatch) => {
//   try {
//     console.log(receipt);
//     dispatch({ type: CENTRAL_RECEIPT_CREATE_REQUEST });
//     const { data } = await axios.post("/api/central/receipts", receipt);
//     dispatch({ type: CENTRAL_RECEIPT_CREATE_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: CENTRAL_RECEIPT_CREATE_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

// connect our reducers and middleware
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  // productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
} from "./reducers/productReducers.js";
import { cartReducer } from "./reducers/cartReducers.js";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListAuthUserReducer,
  orderListReducer,
  orderDeliverReducer,
} from "./reducers/orderReducers.js";

import {
  articleListReducer,
  articleDetailsReducer,
  articleUpdateReducer,
  articleCreateReducer,
  productListReducer,
} from "./reducers/articleReducers.js";

import {
  partnerListReducer,
  partnerDetailsReducer,
  partnerCreateReducer,
  partnerUpdateReducer,
  supplierListReducer,
} from "./reducers/partnerReducers.js";

import {
  lagerListReducer,
  lagerListMaterialReducer,
} from "./reducers/lagerReducers.js";

import {
  centralReceiptCreateReducer,
  centralReceiptListReducer,
} from "./reducers/centralReceiptReducers.js";

import {
  centralExportListReducer,
  centralExportCreateReducer,
} from "./reducers/centralExportReducers.js";

import { materialLagerListReducer } from "./reducers/materialLagerReducers.js";
import { materialImportListReducer } from "./reducers/materialImportReducers.js";
import {
  rateListReducer,
  rateCreateReducer,
} from "./reducers/rateOfYieldReducers.js";

const reducer = combineReducers({
  // productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListAuthUser: orderListAuthUserReducer,
  orderList: orderListReducer,

  articleList: articleListReducer,
  articleDetails: articleDetailsReducer,
  articleCreate: articleCreateReducer,
  articleUpdate: articleUpdateReducer,
  partnerList: partnerListReducer,
  partnerDetails: partnerDetailsReducer,
  partnerCreate: partnerCreateReducer,
  partnerUpdate: partnerUpdateReducer,
  supplierList: supplierListReducer,
  lagerList: lagerListReducer,
  lagerListMaterial: lagerListMaterialReducer,
  centralReceiptList: centralReceiptListReducer,
  centralReceiptCreate: centralReceiptCreateReducer,
  centralExportList: centralExportListReducer,
  centralExportCreate: centralExportCreateReducer,
  materialLagerList: materialLagerListReducer,
  materialImportList: materialImportListReducer,
  rateList: rateListReducer,
  rateCreate: rateCreateReducer,
  productList: productListReducer,
});
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

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
  workerListReducer,
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
  materialListReducer,
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
  lagerArticleQuantityReducer,
  lagerArticleQuantitiesReducer,
  lagerArticlePurchasePricesReducer,
} from "./reducers/lagerReducers.js";

import {
  centralReceiptCreateReducer,
  centralReceiptListReducer,
} from "./reducers/centralReceiptReducers.js";

import {
  centralExportListReducer,
  centralExportCreateReducer,
} from "./reducers/centralExportReducers.js";

import {
  materialLagerListReducer,
  materialLagerQuantitiesReducer,
} from "./reducers/materialLagerReducers.js";
import { materialImportListReducer } from "./reducers/materialImportReducers.js";
import {
  rateListReducer,
  rateDetailsReducer,
  rateCreateReducer,
} from "./reducers/rateOfYieldReducers.js";

import {
  requisitionListReducer,
  requisitionCreateReducer,
  requisitionUnfullfilledListReducer,
  requisitionFullfillReducer,
} from "./reducers/requisitionReducers.js";

import {
  workorderListReducer,
  workorderDetailsReducer,
  workorderCreateReducer,
  workorderUpdateReducer,
  workorderInProgressReducer,
  workorderFinishedReducer,
} from "./reducers/workorderReducers.js";

import { materialConsumptionListReducer } from "./reducers/materialConsumptionReducers.js";
import { productLagerListReducer } from "./reducers/productLagerReducers.js";
import {
  productExportListReducer,
  productExportCreateReducer,
} from "./reducers/productExportReducers.js";
import { centralImportListReducer } from "./reducers/centralImportReducers.js";

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
  lagerArticleQuantity: lagerArticleQuantityReducer,
  lagerArticleQuantities: lagerArticleQuantitiesReducer,
  lagerArticlePurchasePrices: lagerArticlePurchasePricesReducer,
  centralReceiptList: centralReceiptListReducer,
  centralReceiptCreate: centralReceiptCreateReducer,
  centralExportList: centralExportListReducer,
  centralImportList: centralImportListReducer,
  centralExportCreate: centralExportCreateReducer,
  materialLagerList: materialLagerListReducer,
  materialLagerQuantities: materialLagerQuantitiesReducer,
  materialImportList: materialImportListReducer,
  materialConsumptionList: materialConsumptionListReducer,
  rateList: rateListReducer,
  rateDetails: rateDetailsReducer,
  rateCreate: rateCreateReducer,
  productList: productListReducer,
  materialList: materialListReducer,
  requisitionList: requisitionListReducer,
  requisitionUnfullfilledList: requisitionUnfullfilledListReducer,
  requisitionCreate: requisitionCreateReducer,
  requisitionFullFill: requisitionFullfillReducer,
  workerList: workerListReducer,
  workorderList: workorderListReducer,
  workorderCreate: workorderCreateReducer,
  workorderUpdate: workorderUpdateReducer,
  workorderInProgress: workorderInProgressReducer,
  workorderFinished: workorderFinishedReducer,
  workorderDetails: workorderDetailsReducer,
  productLagerList: productLagerListReducer,
  productExportList: productExportListReducer,
  productExportCreate: productExportCreateReducer,
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

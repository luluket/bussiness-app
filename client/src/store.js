// connect our reducers and middleware
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
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
  customerListReducer,
} from "./reducers/partnerReducers.js";

import {
  lagerListReducer,
  lagerListMaterialReducer,
  lagerArticleQuantityReducer,
  lagerArticleQuantitiesReducer,
  lagerArticlePurchasePricesReducer,
  lagerArticleSellingPricesReducer,
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
} from "./reducers/workorderReducers.js";

import { materialConsumptionListReducer } from "./reducers/materialConsumptionReducers.js";
import {
  productLagerListReducer,
  lagerProductQuantityReducer,
  lagerProductQuantitiesReducer,
} from "./reducers/productLagerReducers.js";
import {
  productExportListReducer,
  productExportCreateReducer,
} from "./reducers/productExportReducers.js";
import { centralImportListReducer } from "./reducers/centralImportReducers.js";
import {
  saleReceiptListReducer,
  saleReceiptCreateReducer,
} from "./reducers/saleReceiptReducers.js";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,

  articleList: articleListReducer,
  articleDetails: articleDetailsReducer,
  articleCreate: articleCreateReducer,
  articleUpdate: articleUpdateReducer,
  partnerList: partnerListReducer,
  partnerDetails: partnerDetailsReducer,
  partnerCreate: partnerCreateReducer,
  partnerUpdate: partnerUpdateReducer,
  supplierList: supplierListReducer,
  customerList: customerListReducer,
  lagerList: lagerListReducer,
  lagerListMaterial: lagerListMaterialReducer,
  lagerArticleQuantity: lagerArticleQuantityReducer,
  lagerArticleQuantities: lagerArticleQuantitiesReducer,
  lagerArticlePurchasePrices: lagerArticlePurchasePricesReducer,
  lagerArticleSellingPrices: lagerArticleSellingPricesReducer,
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
  workorderDetails: workorderDetailsReducer,
  productLagerList: productLagerListReducer,
  productExportList: productExportListReducer,
  productExportCreate: productExportCreateReducer,
  lagerProductQuantities: lagerProductQuantitiesReducer,
  lagerProductQuantity: lagerProductQuantityReducer,
  saleReceiptList: saleReceiptListReducer,
  saleReceiptCreate: saleReceiptCreateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

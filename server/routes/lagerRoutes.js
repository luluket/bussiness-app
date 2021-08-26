import express from "express";
import {
  getArticleQuantity,
  getLager,
  getLagerMaterials,
  getArticleQuantities,
  getArticlePurchasePrices,
  getArticleSellingPrices,
} from "../controllers/lagerController.js";
const router = express.Router();

router.route("/").get(getLager);
router.route("/materials").get(getLagerMaterials);
router.route("/quantities").post(getArticleQuantities);
router.route("/purchaseprices").post(getArticlePurchasePrices);
router.route("/sellingprices").post(getArticleSellingPrices);
router.route("/:id").get(getArticleQuantity);
export default router;

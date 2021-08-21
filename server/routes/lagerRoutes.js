import express from "express";
import {
  getArticleQuantity,
  getLager,
  getLagerMaterials,
  getArticleQuantities,
} from "../controllers/lagerController.js";
const router = express.Router();

router.route("/").get(getLager);
router.route("/materials").get(getLagerMaterials);
router.route("/quantities").post(getArticleQuantities);
router.route("/:id").get(getArticleQuantity);
export default router;

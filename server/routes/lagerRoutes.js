import express from "express";
import {
  getArticleQuantity,
  getLager,
  getLagerMaterials,
} from "../controllers/lagerController.js";
const router = express.Router();

router.route("/").get(getLager);
router.route("/materials").get(getLagerMaterials);
router.route("/:id").get(getArticleQuantity);
export default router;

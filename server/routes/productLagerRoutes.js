import express from "express";
import {
  getProductLager,
  getProductQuantities,
} from "../controllers/productLagerController.js";
const router = express.Router();

router.route("/").get(getProductLager);
router.route("/quantities").post(getProductQuantities);
export default router;

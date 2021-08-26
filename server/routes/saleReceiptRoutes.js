import express from "express";
import {
  createReceipt,
  getReceipts,
} from "../controllers/saleReceiptController.js";

const router = express.Router();
router.route("/").get(getReceipts).post(createReceipt);

export default router;

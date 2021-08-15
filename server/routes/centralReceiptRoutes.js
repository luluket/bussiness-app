import express from "express";
import {
  getReceipts,
  createReceipt,
} from "../controllers/centralReceiptController.js";

const router = express.Router();
router.route("/").get(getReceipts).post(createReceipt);

export default router;

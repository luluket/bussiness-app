import express from "express";
import {
  getReceipts,
  //   createReceipt,
} from "../controllers/saleReceiptController.js";

const router = express.Router();
router.route("/").get(getReceipts);

export default router;

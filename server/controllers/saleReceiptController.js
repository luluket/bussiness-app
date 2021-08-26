import asyncHandler from "express-async-handler";
import SaleReceipt from "../models/CentralReceipt.js";
import Lager from "../models/Lager.js";

// @desc Get all sale receipts
// @route GET /api/sale/receipts
// @access Public
const getReceipts = asyncHandler(async (req, res) => {
  const receipts = await SaleReceipt.find({})
    .populate("article", "name unit")
    .populate("partner", "name surname");
  res.json(receipts);
});

export { getReceipts };

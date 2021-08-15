import asyncHandler from "express-async-handler";
import CentralReceipt from "../models/CentralReceipt.js";

// @desc Get all central receipts
// @route GET /api/central/receipts
// @access Public
const getReceipts = asyncHandler(async (req, res) => {
  const receipts = CentralReceipt.find({});
  res.json(receipts);
});

// @desc Create central receipt
// @route POST /api/central/receipts
// @access Public
const createReceipt = asyncHandler(async (req, res) => {
  const receipt = new CentralReceipt({
    partner: req.body.partner,
    document: req.body.document,
    receivedArticles: req.body.receivedArticles,
  });
  const createdReceipt = await receipt.save();
  res.status(201).json(createdReceipt);
});

export { getReceipts, createReceipt };

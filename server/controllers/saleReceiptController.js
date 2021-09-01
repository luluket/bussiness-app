import asyncHandler from "express-async-handler";
import SaleReceipt from "../models/SaleReceipt.js";
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

// @desc Create receipt
// @route POST /api/sale/receipts
// @access Public
const createReceipt = asyncHandler(async (req, res) => {
  const receipt = new SaleReceipt({
    partner: req.body.partner,
    documentType: req.body.documentType,
    documentSubtype: req.body.documentSubtype,
    documentNumber: req.body.documentNumber,
    soldArticles: req.body.soldArticles,
  });
  const receiptCreated = await receipt.save();
  if (receiptCreated) {
    //update lager
    req.body.soldArticles.forEach(async (item) => {
      const itemLager = await Lager.findOne({ article: item.article });
      itemLager.quantity -= item.quantity;
      await itemLager.save();
    });
  } else {
    throw new Error("cant create sale receipt");
  }
  res.status(201).json(receiptCreated);
});

export { getReceipts, createReceipt };

import asyncHandler from "express-async-handler";
import CentralReceipt from "../models/CentralReceipt.js";
import Lager from "../models/Lager.js";

// @desc Get all central receipts
// @route GET /api/central/receipts
// @access Public
const getReceipts = asyncHandler(async (req, res) => {
  const receipts = await CentralReceipt.find({})
    .populate("article", "name unit")
    .populate("partner", "name surname");
  res.json(receipts);
});

// @desc Create central receipt
// @route POST /api/central/receipts
// @access Public
const createReceipt = asyncHandler(async (req, res) => {
  const receipt = new CentralReceipt({
    partner: req.body.partner,
    documentType: req.body.documentType,
    documentSubtype: req.body.documentSubtype,
    documentNumber: req.body.documentNumber,
    receivedArticles: req.body.receivedArticles,
  });
  const createdReceipt = await receipt.save();
  if (createdReceipt) {
    createdReceipt.receivedArticles.forEach(async (item) => {
      var exists = await Lager.findOne({ article: item.article });
      if (exists) {
        // update lager article - quantity and prices
        exists.quantity += item.quantity;
        exists.accumulatedQuantity += item.quantity;
        exists.accumulatedPurchasePrice = (
          exists.accumulatedPurchasePrice + item.purchasePrice
        ).toFixed(2);
        exists.averagePurchasePrice = (
          exists.accumulatedPurchasePrice / exists.accumulatedQuantity
        ).toFixed(2);
        exists.sellingPrice = (exists.averagePurchasePrice * 2.5).toFixed(2);
        await exists.save();
      } else {
        var lagerItem = new Lager({
          article: item.article,
          quantity: item.quantity,
          accumulatedQuantity: item.quantity,
          accumulatedPurchasePrice: item.purchasePrice,
          averagePurchasePrice: (item.purchasePrice / item.quantity).toFixed(2),
          sellingPrice: ((item.purchasePrice / item.quantity) * 2.5).toFixed(2),
        });
        await lagerItem.save();
      }
    });
  }
  res.status(201).json(createdReceipt);
});

export { getReceipts, createReceipt };

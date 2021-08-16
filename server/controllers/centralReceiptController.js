import asyncHandler from "express-async-handler";
import CentralReceipt from "../models/CentralReceipt.js";
import Lager from "../models/Lager.js";

// @desc Get all central receipts
// @route GET /api/central/receipts
// @access Public
const getReceipts = asyncHandler(async (req, res) => {
  const receipts = await CentralReceipt.find({});
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
  if (createdReceipt) {
    createdReceipt.receivedArticles.forEach(async (article) => {
      var exists = await Lager.findOne({ articleId: article.article });
      if (exists) {
        // update lager article - quantity and prices
        exists.quantity += article.quantity;
        exists.accumulatedPurchasePrice = (
          exists.accumulatedPurchasePrice + article.purchasePrice
        ).toFixed(2);
        exists.averagePurchasePrice = (
          exists.accumulatedPurchasePrice / exists.quantity
        ).toFixed(2);
        exists.sellingPrice = (exists.averagePurchasePrice * 2.5).toFixed(2);
        await exists.save();
      } else {
        var item = new Lager({
          articleId: article.article,
          articleName: article.name,
          quantity: article.quantity,
          accumulatedPurchasePrice: article.purchasePrice,
          articleUnit: article.unit,
          averagePurchasePrice: (
            article.purchasePrice / article.quantity
          ).toFixed(2),
          sellingPrice: (
            (article.purchasePrice / article.quantity) *
            2.5
          ).toFixed(2),
        });
        await item.save();
      }
    });
  }
  res.status(201).json(createdReceipt);
});

export { getReceipts, createReceipt };

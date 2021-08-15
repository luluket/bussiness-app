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
      } else {
        var item = new Lager({
          articleId: article.article,
          articleName: article.name,
          quantity: article.quantity,
          articleUnit: "komad",
          averagePurchasePrice: article.purchasePrice / article.quantity,
          sellingPrice: 10,
        });
        await item.save();
      }
    });
  }
  res.status(201).json(createdReceipt);
});

export { getReceipts, createReceipt };

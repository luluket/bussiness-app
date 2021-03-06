import asyncHandler from "express-async-handler";
import Lager from "../models/Lager.js";

//@desc Get Lager List
//@route GET /api/lager
//@access Public
export const getLager = asyncHandler(async (req, res) => {
  const lager = await Lager.find({}).populate("article", "name type unit");
  res.json(lager);
});

//@desc Get materials from lager list
//@route GET /api/lager/materials
//@access Public
export const getLagerMaterials = asyncHandler(async (req, res) => {
  const lager = await Lager.find({}).populate("article", "type name");
  const filteredLager = lager.filter(
    (item) => item.article.type === "materijal"
  );
  res.json(filteredLager);
});

//@desc Get article quantity
//@route GET /api/lager/:id/quantity
//@access Public
export const getArticleQuantity = asyncHandler(async (req, res) => {
  const article = await Lager.findOne({ article: req.params.id }, "quantity");
  res.json(article.quantity);
});

//@desc Get article quantities
//@route POST /api/lager/quantities
//@access Public
export const getArticleQuantities = asyncHandler(async (req, res) => {
  const ids = req.body; // array of article ids
  // find every article quantity in material warehouse, if it doesnt exists return 0
  let quantities = await Promise.all(
    ids.map(async (id) => {
      const item = await Lager.findOne()
        .where("article")
        .equals(id)
        .select("quantity -_id");
      if (item) {
        return item.quantity;
      } else {
        return 0;
      }
    })
  );
  res.json(quantities);
});

//@desc Get article average purchase prices
//@route POST /api/lager/purchaseprices
//@access Public
export const getArticlePurchasePrices = asyncHandler(async (req, res) => {
  const ids = req.body; // array of article ids
  // find every article quantity in material warehouse, if it doesnt exists return 0
  let purchasePrices = await Promise.all(
    ids.map(async (id) => {
      const item = await Lager.findOne()
        .where("article")
        .equals(id)
        .select("averagePurchasePrice -_id");
      if (item) {
        return item.averagePurchasePrice;
      } else {
        return 0;
      }
    })
  );
  res.json(purchasePrices);
});

//@desc Get article average purchase prices
//@route POST /api/lager/sellingprices
//@access Public
export const getArticleSellingPrices = asyncHandler(async (req, res) => {
  const ids = req.body; // array of article ids
  // find every article quantity in material warehouse, if it doesnt exists return 0
  let sellingPrices = await Promise.all(
    ids.map(async (id) => {
      const item = await Lager.findOne()
        .where("article")
        .equals(id)
        .select("sellingPrice -_id");
      if (item) {
        return item.sellingPrice;
      } else {
        return 0;
      }
    })
  );
  res.json(sellingPrices);
});

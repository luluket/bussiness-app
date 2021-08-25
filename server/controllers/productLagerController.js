import asyncHandler from "express-async-handler";
import ProductLager from "../models/ProductLager.js";

//@desc Get product lager List
//@route GET /api/product/lager
//@access Public
export const getProductLager = asyncHandler(async (req, res) => {
  const productLager = await ProductLager.find({}).populate(
    "article",
    "name unit"
  );
  res.json(productLager);
});

//@desc Get product quantities
//@route POST /api/product/lager/quantities
//@access Public
export const getProductQuantities = asyncHandler(async (req, res) => {
  const ids = req.body; // array of article ids
  // find every article quantity in material warehouse, if it doesnt exists return 0
  let quantities = await Promise.all(
    ids.map(async (id) => {
      const item = await ProductLager.findOne()
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

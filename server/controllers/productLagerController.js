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

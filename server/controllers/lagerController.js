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

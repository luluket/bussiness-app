import asyncHandler from "express-async-handler";
import Lager from "../models/Lager.js";
import Article from "../models/Article.js";

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

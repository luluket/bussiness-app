import asyncHandler from "express-async-handler";
import MaterialLager from "../models/MaterialLager.js";
//@desc Get material lager List
//@route GET /api/material/Lager
//@access Public
export const getMaterialLager = asyncHandler(async (req, res) => {
  const materialLager = await MaterialLager.find({}).populate(
    "article",
    "name unit"
  );
  res.json(materialLager);
});

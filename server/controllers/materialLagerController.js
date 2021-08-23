import asyncHandler from "express-async-handler";
import MaterialLager from "../models/MaterialLager.js";

//@desc Get material lager List
//@route GET /api/material/lager
//@access Public
export const getMaterialLager = asyncHandler(async (req, res) => {
  const materialLager = await MaterialLager.find({}).populate(
    "article",
    "name unit"
  );
  res.json(materialLager);
});

//@desc Get article quantities
//@route POST /api/material/lager/quantities
//@access Public
export const getMaterialQuantities = asyncHandler(async (req, res) => {
  const ids = req.body; // array of article ids
  // find every article quantity in material warehouse, if it doesnt exists return 0
  let quantities = await Promise.all(
    ids.map(async (id) => {
      const item = await MaterialLager.findOne()
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

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
  const ids = req.body;
  const quantities = [];
  // find every article quantity in material warehouse, if it doesnt exists return 0
  ids.map(async (id) => {
    const quantity = await MaterialLager.findOne()
      .where("article")
      .equals(id)
      .select("quantity -_id")
      .then((value) => {
        if (value) {
          const { quantity } = value;
          quantities.push(quantity);
        } else {
          quantities.push(0);
        }
        if (req.body.length === quantities.length) {
          // callback break condition, when last request body item has been checked
          res.json(quantities);
        }
      });
  });
});

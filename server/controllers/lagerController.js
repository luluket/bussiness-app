import asyncHandler from "express-async-handler";
import Lager from "../models/Lager.js";
//@desc Get Lager List
//@route GET /api/lager
//@access Public
export const getLager = asyncHandler(async (req, res) => {
  const lager = await Lager.find({});
  res.json(lager);
});

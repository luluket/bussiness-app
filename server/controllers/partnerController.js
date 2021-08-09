import asyncHandler from "express-async-handler";
import Partner from "../models/Partner.js";

// @desc Get all partners
// @route GET /api/partners
// @access Public
const getPartners = asyncHandler(async (req, res) => {
  const partners = await Partner.find({});
  res.json(partners);
});

export { getPartners };

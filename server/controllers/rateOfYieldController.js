import asyncHandler from "express-async-handler";
import RateOfYield from "../models/RateOfYield.js";

// @desc Fetch all rate of yields
// @route GET /api/rates
// @access Public
const getRates = asyncHandler(async (req, res) => {
  const rates = await RateOfYield.find({})
    .populate("product", "name")
    .populate("components.material", "name");
  res.json(rates);
});

// @desc Create single rate of yield
// @route POST /api/rates
// @access Public
const createRate = asyncHandler(async (req, res) => {
  const rate = new RateOfYield({
    product: req.body.product,
    components: req.body.components,
  });
  const createdRate = await rate.save();
  res.status(201).json(createdRate);
});

export { getRates, createRate };

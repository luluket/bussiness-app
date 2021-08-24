import asyncHandler from "express-async-handler";
import MaterialConsumption from "../models/MaterialConsumption.js";

// @desc Fetch all material consumptions
// @route GET /api/material/consumptions
// @access Public
const getMaterialConsumptions = asyncHandler(async (req, res) => {
  const materialConsumption = await MaterialConsumption.find({})
    .populate("workorder", "documentNumber documentType")
    .populate("article", "name");
  res.json(materialConsumption);
});

export { getMaterialConsumptions };

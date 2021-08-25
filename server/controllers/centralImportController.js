import asyncHandler from "express-async-handler";
import CentralImport from "../models/CentralImport.js";

// @desc Get all material imports
// @route GET /api/central/imports
// @access Public
const getImports = asyncHandler(async (req, res) => {
  const imports = await CentralImport.find({});
  res.json(imports);
});

export { getImports };

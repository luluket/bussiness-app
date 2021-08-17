import asyncHandler from "express-async-handler";
import MaterialImport from "../models/MaterialImport.js";

// @desc Get all material imports
// @route GET /api/material/imports
// @access Public
const getImports = asyncHandler(async (req, res) => {
  const imports = await MaterialImport.find({});
  res.json(imports);
});

export { getImports };

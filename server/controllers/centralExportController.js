import asyncHandler from "express-async-handler";
import CentralExport from "../models/CentralExport.js";
import MaterialLager from "../models/MaterialLager.js";
import MaterialImport from "../models/MaterialImport.js";
import Lager from "../models/Lager.js";

// @desc Get all central exports
// @route GET /api/central/exports
// @access Public
const getExports = asyncHandler(async (req, res) => {
  const exports = await CentralExport.find({}).populate(
    "exportedArticles.article",
    "name unit"
  );
  res.json(exports);
});

// @desc Create central export
// @route POST /api/central/exports
// @access Public
const createExport = asyncHandler(async (req, res) => {
  const exportArticles = new CentralExport({
    departureWarehouse: req.body.departureWarehouse,
    destinationWarehouse: req.body.destinationWarehouse,
    documentType: req.body.documentType,
    documentNumber: req.body.documentNumber,
    exportedArticles: req.body.exportedArticles,
  });

  const importArticles = new MaterialImport({
    departureWarehouse: req.body.departureWarehouse,
    destinationWarehouse: req.body.destinationWarehouse,
    documentType: "mđskl-ulaz",
    documentNumber: req.body.documentNumber,
    importedArticles: req.body.exportedArticles,
  });

  const createdExport = await exportArticles.save();
  await importArticles.save();

  if (createdExport) {
    createdExport.exportedArticles.forEach(async (item) => {
      var exists = await MaterialLager.findOne({ article: item.article });
      if (exists) {
        // update lager article - quantity
        exists.quantity += item.quantity;
        await exists.save();
      } else {
        var itemMaterial = new MaterialLager({
          article: item.article,
          quantity: item.quantity,
        });
        await itemMaterial.save();
      }

      //substract exported quantity in central lager
      var lagerItem = await Lager.findOne({ article: item.article });
      lagerItem.quantity -= item.quantity;
      await lagerItem.save();
    });
  }
  res.status(201).json(createdExport);
});

export { getExports, createExport };

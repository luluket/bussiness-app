import asyncHandler from "express-async-handler";
import CentralExport from "../models/CentralExport.js";
import MaterialLager from "../models/MaterialLager.js";
import MaterialImport from "../models/MaterialImport.js";
import Lager from "../models/Lager.js";

// @desc Get all central exports
// @route GET /api/central/exports
// @access Public
const getExports = asyncHandler(async (req, res) => {
  const exports = await CentralExport.find({});
  res.json(exports);
});

// @desc Create central export
// @route POST /api/central/exports
// @access Public
const createExport = asyncHandler(async (req, res) => {
  const exportArticles = new CentralExport({
    warehouse: req.body.warehouse,
    document: req.body.document,
    exportedArticles: req.body.exportedArticles,
  });
  // const importArticles = new MaterialImport({
  //   warehouse: req.body.warehouse,
  //   document: req.body.document,
  //   importedArticles: req.body.exportedArticles,
  // });
  const createdExport = await exportArticles.save();
  // const createdImport = await importArticles.save();
  if (createdExport) {
    createdExport.exportedArticles.forEach(async (article) => {
      var exists = await MaterialLager.findOne({ articleId: article.article });
      if (exists) {
        // update lager article - quantity
        exists.quantity += article.quantity;
        await exists.save();
      } else {
        var item = new MaterialLager({
          articleId: article.article,
          articleName: article.name,
          quantity: article.quantity,
          articleUnit: article.unit,
        });
        await item.save();
      }
      //substract exported quantity in central lager
      const lagerItem = await Lager.findOne({ articleId: article.article });
      lagerItem.quantity = lagerItem.quantity - article.quantity;
      await lagerItem.save();
    });
  }
  res.status(201).json(createdExport);
});

export { getExports, createExport };

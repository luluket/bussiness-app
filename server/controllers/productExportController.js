import asyncHandler from "express-async-handler";
import ProductExport from "../models/ProductExport.js";
import Lager from "../models/Lager.js";
import CentralImport from "../models/CentralImport.js";
import ProductLager from "../models/ProductLager.js";

// @desc Get all product exports
// @route GET /api/product/exports
// @access Public
const getExports = asyncHandler(async (req, res) => {
  const exports = await ProductExport.find({}).populate(
    "exportedArticles.article",
    "name unit"
  );
  res.json(exports);
});

// @desc Create central export
// @route POST /api/product/exports
// @access Public
const createExport = asyncHandler(async (req, res) => {
  const exportArticles = new ProductExport({
    departureWarehouse: req.body.departureWarehouse,
    destinationWarehouse: req.body.destinationWarehouse,
    documentType: req.body.documentType,
    documentNumber: req.body.documentNumber,
    exportedArticles: req.body.exportedArticles,
  });

  const importArticles = new CentralImport({
    departureWarehouse: req.body.departureWarehouse,
    destinationWarehouse: req.body.destinationWarehouse,
    documentType: req.body.documentType,
    documentNumber: req.body.documentNumber,
    importedArticles: req.body.exportedArticles,
  });

  const createdExport = await exportArticles.save();
  await importArticles.save();

  if (createdExport) {
    createdExport.exportedArticles.forEach(async (item) => {
      var exists = await Lager.findOne({ article: item.article });
      if (exists) {
        // update lager article quantity
        exists.quantity += item.quantity;
        exists.accumulatedQuantity += item.quantity;
        exists.accumulatedPurchasePrice += item.purchasePrice;
        exists.averagePurchasePrice =
          exists.accumulatedPurchasePrice / exists.accumulatedQuantity;
        await exists.save();
      } else {
        var itemProduct = new Lager({
          article: item.article,
          quantity: item.quantity,
          accumulatedQuantity: item.quantity,
          accumulatedPurchasePrice: item.purchasePrice,
          averagePurchasePrice: item.purchasePrice,
          sellingPrice: item.manufacturePrice * 2.5,
        });
        await itemProduct.save();
      }

      //substract exported quantity in product lager
      var lagerItem = await ProductLager.findOne({ article: item.article });
      lagerItem.quantity -= item.quantity;
      await lagerItem.save();
    });
  }
  res.status(201).json(createdExport);
});

export { getExports, createExport };

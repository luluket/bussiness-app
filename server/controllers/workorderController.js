import asyncHandler from "express-async-handler";
import Workorder from "../models/Workorder.js";
import ProductLager from "../models/ProductLager.js";
import MaterialLager from "../models/MaterialLager.js";

// @desc Fetch all articles
// @route GET /api/workorders
// @access Public
const getWorkorders = asyncHandler(async (req, res) => {
  const workorders = await Workorder.find({});
  res.json(workorders);
});

// @desc Create workorder, update MaterialLager, create ProductLager article
// @route POST /api/workorders
// @access Public
const createWorkorder = asyncHandler(async (req, res) => {
  const workorder = new Workorder({
    documentType: req.body.documentType,
    documentNumber: req.body.documentNumber,
    warehouse: req.body.warehouse,
    materialWarehouse: req.body.materialWarehouse,
    article: req.body.article,
    quantity: req.body.quantity,
    description: req.body.description,
    rateOfYield: req.body.rateOfYield,
    lot: req.body.lot,
    workers: req.body.workers,
    totalPurchasePrice: req.body.totalPurchasePrice,
    totalManufacturePrice: req.body.totalManufacturePrice,
    status: req.body.status,
  });
  const workorderCreated = await workorder.save();
  res.status(201).json(workorderCreated);

  // // product to be stored at warehouse
  // const product = new ProductLager({
  //   article: req.body.article,
  //   quantity: req.body.quantity,
  //   purchasePrice: req.body.purchasePrice,
  //   workorder: workorderCreated._id,
  // });
  // await product.save();

  // // change material lager quantity
  // if (workorderCreated) {
  //   // loop through rate of yield article and substract quantities from material lager
  //   workorderCreated.rateOfYield.components.forEach(async (item) => {
  //     const material = await MaterialLager.findOne({ article: item.material });
  //     material.quantity -= item.quantity;
  //     await material.save();
  //   });
  // }
  // res.status(201).json({ message: "3 documents created" });
});
export { getWorkorders, createWorkorder };

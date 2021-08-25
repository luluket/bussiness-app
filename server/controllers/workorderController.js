import asyncHandler from "express-async-handler";
import Workorder from "../models/Workorder.js";
import ProductLager from "../models/ProductLager.js";
import MaterialLager from "../models/MaterialLager.js";
import MaterialConsumption from "../models/MaterialConsumption.js";

// @desc Get all workorder
// @route GET /api/workorders
// @access Public
const getWorkorders = asyncHandler(async (req, res) => {
  const workorders = await Workorder.find({});
  res.json(workorders);
});

// @desc Get single workorder
// @route GET /api/workorders/:id
// @access Public
const getWorkorder = asyncHandler(async (req, res) => {
  const workorder = await Workorder.findById(req.params.id)
    .populate("article", "name")
    .populate({
      path: "rateOfYield",
      populate: { path: "product", select: "name" },
    })
    .populate({
      path: "rateOfYield",
      populate: {
        path: "components",
        populate: { path: "material", select: "name" },
      },
    })
    .populate({
      path: "workers",
      populate: { path: "user", select: "_id name surname" },
    });
  res.json(workorder);
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
    toDo: req.body.toDo,
    inProgress: req.body.inProgress,
    finished: req.body.finished,
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

// @desc Set workorder in progress
// @route PUT /api/workorders/:id/inprogress
// @access Public
const setWorkorderInProgress = asyncHandler(async (req, res) => {
  const workorder = await Workorder.findById(req.params.id);
  workorder.toDo = false;
  workorder.inProgress = true;
  workorder.finished = false;
  await workorder.save();
  res.json(workorder);
});

// @desc Set workorder to finished
// @route PUT /api/workorders/:id/finished
// @access Public
const setWorkorderToFinished = asyncHandler(async (req, res) => {
  const workorder = await Workorder.findById(req.params.id);
  workorder.toDo = false;
  workorder.inProgress = false;
  workorder.finished = true;

  await workorder.save();

  //create material consumption document
  const materialConsumption = new MaterialConsumption({
    workorder: req.body._id,
    article: req.body.article,
    consumedArticles: req.body.consumedArticles,
  });
  await materialConsumption.save();

  // substract material warehouse quantities
  req.body.consumedArticles.forEach(async (item) => {
    const material = await MaterialLager.findOne({ article: item.article });
    material.quantity -= item.quantity;
    await material.save();
  });

  //add manufactured product to product warehouse
  const product = new ProductLager({
    article: req.body.article,
    quantity: req.body.productQuantity,
    purchasePrice: req.body.totalPurchasePrice / req.body.productQuantity,
    manufacturePrice: req.body.totalManufacturePrice / req.body.productQuantity,
  });
  await product.save();

  res.status(201).json({ message: "Workorder finished" });
});

// @desc Update single article
// @route PUT /api/workorders/:id
// @access Public
const updateWorkorder = asyncHandler(async (req, res) => {
  const workorder = await Workorder.findById(req.params.id);
  console.log(req.body);
  if (workorder) {
    workorder.documentType = req.body.documentType;
    workorder.documentNumber = req.body.documentNumber;
    workorder.warehouse = req.body.warehouse;
    workorder.materialWarehouse = req.body.materialWarehouse;
    workorder.article = req.body.article;
    workorder.quantity = req.body.quantity;
    workorder.description = req.body.description;
    workorder.rateOfYield = req.body.rateOfYield;
    workorder.lot = req.body.lot;
    workorder.workers = req.body.workers;
    workorder.totalPurchasePrice = req.body.totalPurchasePrice;
    workorder.totalManufacturePrice = req.body.totalManufacturePrice;
    const updatedWorkorder = await workorder.save();
    res.json(updatedWorkorder);
    console.log(updatedWorkorder);
  } else {
    res.status(404);
    throw new Error("Article not found");
  }
});

export {
  getWorkorders,
  getWorkorder,
  createWorkorder,
  setWorkorderInProgress,
  setWorkorderToFinished,
  updateWorkorder,
};

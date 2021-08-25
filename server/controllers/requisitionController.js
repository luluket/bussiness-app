import asyncHandler from "express-async-handler";
import Requisition from "../models/Requisition.js";

// @desc Get all requisitions
// @route GET /api/requisitions
// @access Public
const getRequisitions = asyncHandler(async (req, res) => {
  const requisitions = await Requisition.find({}).populate(
    "requestedArticles.article",
    "name"
  );
  res.json(requisitions);
});

// @desc Get all unfullfilled requisitons
// @route GET /api/requisitions/unfullfilled
// @access Public
const getUnfullfilledRequisitions = asyncHandler(async (req, res) => {
  const requisitions = await Requisition.find({ isFullfilled: false }).populate(
    "requestedArticles.article",
    "name"
  );
  res.json(requisitions);
});

// @desc Create central export
// @route POST /api/requisitions
// @access Public
const createRequisition = asyncHandler(async (req, res) => {
  const requisition = new Requisition({
    requestedArticles: req.body.requestedArticles,
    documentType: req.body.documentType,
    documentNumber: req.body.documentNumber,
    isSent: true,
    isFullfilled: false,
  });
  const created = await requisition.save();
  res.json(created);
});

// @desc Create central export
// @route PUT /api/requisitions/:id/fullfill
// @access Public
const fullfillRequisition = asyncHandler(async (req, res) => {
  const requisition = await Requisition.findById(req.params.id);
  if (requisition) {
    requisition.isFullfilled = true;
    const fullfilledRequisition = await requisition.save();
    res.json(fullfilledRequisition);
  } else {
    res.status(404);
    throw new Error("requisition not found");
  }
});

export {
  getRequisitions,
  createRequisition,
  getUnfullfilledRequisitions,
  fullfillRequisition,
};

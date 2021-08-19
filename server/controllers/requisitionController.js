import asyncHandler from "express-async-handler";
import Requisition from "../models/Requisition.js";

// @desc Get all requisitions
// @route GET /api/requisitions
// @access Public
const getRequisitions = asyncHandler(async (req, res) => {
  const requisitions = await Requisition.find({});
  res.json(requisitions);
});

// @desc Get all unfullfilled requisitons
// @route GET /api/requisitions/unfullfilled
// @access Public
const getUnfullfilledRequisitions = asyncHandler(async (req, res) => {
  const requisitions = await Requisition.find({ isFullfilled: false });
  res.json(requisitions);
});

// @desc Create central export
// @route POST /api/central/exports
// @access Public
const createRequisition = asyncHandler(async (req, res) => {
  const requisition = new Requisition({
    article: req.body.article,
    quantity: req.body.quantity,
    isSent: true,
    isFullfilled: false,
  });
  const created = await requisition.save();
  res.json(created);
});

export { getRequisitions, createRequisition, getUnfullfilledRequisitions };

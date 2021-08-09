import asyncHandler from "express-async-handler";
import Partner from "../models/Partner.js";

// @desc Get all partners
// @route GET /api/partners
// @access Public
const getPartners = asyncHandler(async (req, res) => {
  const partners = await Partner.find({});
  res.json(partners);
});

// @desc Create Partner
// @route POST /api/partners
// @access Public
const createPartner = asyncHandler(async (req, res) => {
  const partner = new Partner({
    name: req.body.name,
    surname: req.body.surname,
    oib: req.body.oib,
    email: req.body.email,
    type: req.body.type,
    role: req.body.role,
  });
});

export { getPartners, createPartner };
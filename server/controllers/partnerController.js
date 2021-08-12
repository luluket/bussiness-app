import asyncHandler from "express-async-handler";
import Partner from "../models/Partner.js";

// @desc Get all partners
// @route GET /api/partners
// @access Public
const getPartners = asyncHandler(async (req, res) => {
  const partners = await Partner.find({}).sort({ type: "ASC" });
  res.json(partners);
});

// @desc Get single partner
// @route GET /api/partners/:id
// @access Public
const getPartner = asyncHandler(async (req, res) => {
  const partner = await Partner.findById(req.params.id);
  if (partner) {
    res.json(partner);
  } else {
    res.status(404);
    throw new Error("Partner not found");
  }
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
    street: req.body.street,
    houseNumber: req.body.houseNumber,
    zip: req.body.zip,
    country: req.body.country,
    telephone: req.body.telephone,
    city: req.body.city,
  });
  const createdPartner = await partner.save();
  res.status(201).json(createdPartner);
});

export { getPartners, getPartner, createPartner };

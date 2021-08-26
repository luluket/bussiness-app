import asyncHandler from "express-async-handler";
import Partner from "../models/Partner.js";

// @desc Get all partners
// @route GET /api/partners
// @access Public
const getPartners = asyncHandler(async (req, res) => {
  const partners = await Partner.find({}).sort({ type: "ASC" });
  res.json(partners);
});

// @desc Update single partner
// @route PUT /api/partners/:id
// @access Public
const updatePartner = asyncHandler(async (req, res) => {
  const partner = await Partner.findById(req.params.id);
  if (partner) {
    partner.name = req.body.name || partner.name;
    partner.surname = req.body.surname || partner.surname;
    partner.oib = req.body.oib || partner.oib;
    partner.type = req.body.type || partner.type;
    partner.email = req.body.email || partner.email;
    partner.street = req.body.street || partner.street;
    partner.houseNumber = req.body.houseNumber || partner.houseNumber;
    partner.zip = req.body.zip || partner.zip;
    partner.city = req.body.city || partner.city;
    partner.country = req.body.country || partner.country;
    partner.telephone = req.body.telephone || partner.telephone;
    const updatedPartner = await partner.save();
    res.json({
      _id: updatedPartner._id,
      name: updatedPartner.name,
      surname: updatedPartner.surname,
      oib: updatedPartner._id,
      type: updatedPartner.type,
      email: updatedPartner.email,
      street: updatedPartner.street,
      houseNumber: updatedPartner.houseNumber,
      zip: updatedPartner.zip,
      city: updatedPartner.city,
      country: updatedPartner.country,
      telephone: updatedPartner.telephone,
    });
  } else {
    res.status(404);
    throw new Error("Partner not found");
  }
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

// @desc Get all suppliers
// @route GET /api/partners/suppliers
// @access Public
const getSuppliers = asyncHandler(async (req, res) => {
  const suppliers = await Partner.find({ type: "dobavljač" });
  res.json(suppliers);
});

// @desc Get all customers
// @route GET /api/partners/customers
// @access Public
const getCustomers = asyncHandler(async (req, res) => {
  const customers = await Partner.find({ type: "kupac" });
  res.json(customers);
});

export {
  getPartners,
  getPartner,
  createPartner,
  updatePartner,
  getSuppliers,
  getCustomers,
};

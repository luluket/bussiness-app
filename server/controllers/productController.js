import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}); // finds all
  // res.status(401);
  // throw new Error("not authorized");
  res.json(products);
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, getProduct };

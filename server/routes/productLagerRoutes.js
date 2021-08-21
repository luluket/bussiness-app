import express from "express";
import { getProductLager } from "../controllers/productLagerController.js";
const router = express.Router();

router.route("/").get(getProductLager);
export default router;

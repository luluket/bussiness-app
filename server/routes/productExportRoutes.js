import express from "express";
import {
  getExports,
  createExport,
} from "../controllers/productExportController.js";

const router = express.Router();
router.route("/").get(getExports).post(createExport);
export default router;

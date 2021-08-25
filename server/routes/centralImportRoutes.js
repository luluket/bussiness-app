import express from "express";
import { getImports } from "../controllers/centralImportController.js";

const router = express.Router();
router.route("/").get(getImports);
export default router;

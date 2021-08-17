import express from "express";
import { getImports } from "../controllers/materialImportController.js";

const router = express.Router();
router.route("/").get(getImports);
export default router;

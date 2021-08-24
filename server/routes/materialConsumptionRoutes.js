import express from "express";

import { getMaterialConsumptions } from "../controllers/materialConsumptionController.js";
const router = express.Router();

router.route("/").get(getMaterialConsumptions);
export default router;

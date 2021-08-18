import express from "express";
import { getRates, createRate } from "../controllers/rateOfYieldController.js";

const router = express.Router();
router.route("/").get(getRates).post(createRate);

export default router;

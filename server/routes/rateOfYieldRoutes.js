import express from "express";
import {
  getRates,
  createRate,
  getRate,
} from "../controllers/rateOfYieldController.js";

const router = express.Router();
router.route("/").get(getRates).post(createRate);
router.route("/:id").get(getRate);

export default router;

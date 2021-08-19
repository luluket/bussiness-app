import express from "express";
import {
  getRequisitions,
  createRequisition,
  getUnfullfilledRequisitions,
} from "../controllers/requisitionController.js";
const router = express.Router();

router.route("/").get(getRequisitions).post(createRequisition);
router.route("/unfullfilled").get(getUnfullfilledRequisitions);
export default router;

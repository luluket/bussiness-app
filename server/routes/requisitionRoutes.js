import express from "express";
import {
  getRequisitions,
  createRequisition,
  getUnfullfilledRequisitions,
  fullfillRequisition,
} from "../controllers/requisitionController.js";
const router = express.Router();

router.route("/").get(getRequisitions).post(createRequisition);
router.route("/unfullfilled").get(getUnfullfilledRequisitions);
router.route("/:id/fullfill").put(fullfillRequisition);
export default router;

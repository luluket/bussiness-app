import express from "express";
import {
  getMaterialLager,
  getMaterialQuantities,
} from "../controllers/materialLagerController.js";
const router = express.Router();

router.route("/").get(getMaterialLager);
router.route("/quantities").post(getMaterialQuantities);

export default router;

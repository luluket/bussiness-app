import express from "express";
import { getMaterialLager } from "../controllers/materialLagerController.js";
const router = express.Router();

router.route("/").get(getMaterialLager);
export default router;

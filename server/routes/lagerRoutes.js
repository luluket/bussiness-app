import express from "express";
import { getLager } from "../controllers/lagerController.js";
const router = express.Router();

router.route("/").get(getLager);
export default router;

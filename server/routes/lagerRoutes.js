import express from "express";
import { getLager, getLagerMaterials } from "../controllers/lagerController.js";
const router = express.Router();

router.route("/").get(getLager);
router.route("/materials").get(getLagerMaterials);
export default router;

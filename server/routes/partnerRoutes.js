import express from "express";
import {
  getPartners,
  createPartner,
} from "../controllers/partnerController.js";
const router = express.Router();

router.route("/").get(getPartners).post(createPartner);
export default router;

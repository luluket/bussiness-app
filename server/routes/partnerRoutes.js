import express from "express";
import {
  getPartners,
  createPartner,
} from "../controllers/partnerController.js";
const router = express.Router();

router.route("/").get(getPartners);
router.route("/").post(createPartner);
export default router;

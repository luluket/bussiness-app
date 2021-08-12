import express from "express";
import {
  getPartners,
  getPartner,
  createPartner,
} from "../controllers/partnerController.js";
const router = express.Router();

router.route("/").get(getPartners).post(createPartner);
router.route("/:id").get(getPartner);
export default router;

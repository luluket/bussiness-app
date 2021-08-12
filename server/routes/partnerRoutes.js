import express from "express";
import {
  getPartners,
  getPartner,
  createPartner,
  updatePartner,
} from "../controllers/partnerController.js";
const router = express.Router();

router.route("/").get(getPartners).post(createPartner);
router.route("/:id").get(getPartner).put(updatePartner);
export default router;

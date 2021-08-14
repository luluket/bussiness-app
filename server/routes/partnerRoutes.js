import express from "express";
import {
  getPartners,
  getPartner,
  createPartner,
  updatePartner,
  getSuppliers,
} from "../controllers/partnerController.js";
const router = express.Router();

router.route("/").get(getPartners).post(createPartner);
router.route("/suppliers").get(getSuppliers);
router.route("/:id").get(getPartner).put(updatePartner);
export default router;

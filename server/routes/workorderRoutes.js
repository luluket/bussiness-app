import express from "express";
import {
  getWorkorders,
  getWorkorder,
  createWorkorder,
} from "../controllers/workorderController.js";
const router = express.Router();

router.route("/").get(getWorkorders).post(createWorkorder);
router.route("/:id").get(getWorkorder);
export default router;

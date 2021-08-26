import express from "express";
import {
  getWorkorders,
  getWorkorder,
  createWorkorder,
  updateWorkorder,
} from "../controllers/workorderController.js";
const router = express.Router();

router.route("/").get(getWorkorders).post(createWorkorder);
router.route("/:id").get(getWorkorder).put(updateWorkorder);

export default router;

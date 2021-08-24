import express from "express";
import {
  getWorkorders,
  getWorkorder,
  createWorkorder,
  setWorkorderInProgress,
  setWorkorderToFinished,
} from "../controllers/workorderController.js";
const router = express.Router();

router.route("/").get(getWorkorders).post(createWorkorder);
router.route("/:id").get(getWorkorder);

router.route("/:id/inprogress").put(setWorkorderInProgress);
router.route("/:id/finished").put(setWorkorderToFinished);
export default router;

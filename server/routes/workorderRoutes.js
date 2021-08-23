import express from "express";
import {
  getWorkorders,
  createWorkorder,
} from "../controllers/workorderController.js";
const router = express.Router();

router.route("/").get(getWorkorders).post(createWorkorder);
export default router;

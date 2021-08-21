import express from "express";
import {
  getWorkorders
} from "../controllers/workorderController.js";
const router = express.Router();

router.route("/").get(getWorkorders)
export default router;

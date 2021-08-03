import express from "express";

import {
  getArticles,
  getArticle,
  updateArticle,
} from "../controllers/articleController.js";
const router = express.Router();

router.route("/").get(getArticles);
router.route("/:id").get(getArticle).put(updateArticle);
export default router;

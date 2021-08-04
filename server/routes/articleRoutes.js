import express from "express";

import {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
} from "../controllers/articleController.js";
const router = express.Router();

router.route("/").get(getArticles).post(createArticle);
router.route("/:id").get(getArticle).put(updateArticle);
export default router;

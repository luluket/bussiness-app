import express from "express";

import {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  getProducts,
  getMaterials,
} from "../controllers/articleController.js";
const router = express.Router();

router.route("/").get(getArticles).post(createArticle);
router.route("/products").get(getProducts);
router.route("/materials").get(getMaterials);
router.route("/:id").get(getArticle).put(updateArticle);
export default router;

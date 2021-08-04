import asyncHandler from "express-async-handler";
import Article from "../models/Article.js";

// @desc Fetch all articles
// @route GET /api/articles
// @access Public
const getArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find({});
  res.json(articles);
});

// @desc Get single article
// @route GET /api/articles/:id
// @access Public
const getArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article) {
    res.json(article);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Create single article
// @route POST /api/articles
// @access Public
const createArticle = asyncHandler(async (req, res) => {
  const article = new Article({
    name: req.body.name,
    type: req.body.type,
    image: req.body.image,
    pdv: req.body.pdv,
    description: req.body.description,
  });
  const createdArticle = await article.save();
  res.status(201).json(createdArticle);
});

// @desc Update single article
// @route PUT /api/articles/:id
// @access Public
const updateArticle = asyncHandler(async (req, res) => {
  const { name, type, pdv, description } = req.body;
  const article = await Article.findById(req.params.id);
  if (article) {
    article.name = name;
    article.description = description;
    article.type = type;
    article.pdv = pdv;
    const updatedArticle = await article.save();
    res.json(updatedArticle);
  } else {
    res.status(404);
    throw new Error("Article not found");
  }
});
export { getArticles, getArticle, createArticle, updateArticle };

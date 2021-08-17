import mongoose from "mongoose";
const materialLagerSchema = mongoose.Schema({
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Article",
  },
  articleName: {
    type: mongoose.Schema.Types.String,
    required: true,
    ref: "Article",
  },
  quantity: {
    type: Number,
    required: true,
  },
  articleUnit: {
    type: mongoose.Schema.Types.String,
    required: true,
    ref: "Article",
  },
});
const MaterialLager = mongoose.model("MaterialLager", materialLagerSchema);

export default MaterialLager;

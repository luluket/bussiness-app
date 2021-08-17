import mongoose from "mongoose";
const materialLagerSchema = mongoose.Schema({
  article: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Article",
  },
  quantity: {
    type: Number,
    required: true,
  },
});
const MaterialLager = mongoose.model("MaterialLager", materialLagerSchema);

export default MaterialLager;

import mongoose from "mongoose";
const productLagerSchema = mongoose.Schema({
  article: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Article",
  },
  quantity: {
    type: Number,
    required: true,
  },
  purchasePrice: {
    type: Number,
    required: true,
  },
  workorder: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Workorder",
  },
});
const ProductLager = mongoose.model("ProductLager", productLagerSchema);

export default ProductLager;

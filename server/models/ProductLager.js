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
  manufacturePrice: {
    type: Number,
    required: true,
  },
});
const ProductLager = mongoose.model("ProductLager", productLagerSchema);

export default ProductLager;

import mongoose from "mongoose";
import Double from "@mongoosejs/double";
const centralReceiptSchema = mongoose.Schema(
  {
    partner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Partner",
    },
    document: {
      type: Number,
      required: true,
      unique: true,
      min: 1,
    },
    receivedArticles: [
      {
        article: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Article",
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        unit: { type: String, required: true },
        purchasePrice: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const CentralReceipt = mongoose.model("CentralReceipt", centralReceiptSchema);

export default CentralReceipt;

import mongoose from "mongoose";
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
    },
    receivedArticles: [
      {
        article: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Article",
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        purchasePrice: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const CentralReceipt = mongoose.model("CentralReceipt", centralReceiptSchema);

export default CentralReceipt;

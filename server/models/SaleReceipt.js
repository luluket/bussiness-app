import mongoose from "mongoose";
const saleReceiptSchema = mongoose.Schema(
  {
    partner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Partner",
    },
    documentType: {
      type: String,
      required: true,
    },
    documentSubtype: {
      type: String,
      required: true,
    },
    documentNumber: {
      type: Number,
      required: true,
      unique: true,
      min: 1,
    },
    soldArticles: [
      {
        article: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Article",
        },
        quantity: { type: Number, required: true, min: 1 },
        base: {
          type: Number,
          required: true,
        },
        pdv: {
          type: Number,
          required: true,
        },
        sellingPrice: {
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

const SaleReceipt = mongoose.model("SaleReceipt", saleReceiptSchema);

export default SaleReceipt;

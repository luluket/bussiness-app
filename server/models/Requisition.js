import mongoose from "mongoose";

const requisitionSchema = mongoose.Schema(
  {
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
    requestedArticles: [
      {
        article: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Article",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    isSent: {
      type: Boolean,
      required: true,
    },
    isFullfilled: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Requisition = mongoose.model("Requisition", requisitionSchema);

export default Requisition;

import mongoose from "mongoose";

const requisitionSchema = mongoose.Schema(
  {
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

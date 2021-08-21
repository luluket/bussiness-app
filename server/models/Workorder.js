import mongoose from "mongoose";
/*
    dokument
    artikl-proizvod
    komada

*/
const workorderSchema = mongoose.Schema(
  {
    documentType: {
      type: String,
      required: true,
    },
    documentNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    warehouse: {
      type: String,
      required: true,
    },
    materialWarehouse: {
      type: String,
      required: true,
    },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Article",
    },
    quantity: {
      type: Number,
      required: true,
    },
    rateOfYield: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "RateOfYield",
    },
    consumedArticles: [
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
    purchasePrice: {
      type: Number,
      required: true,
    },
    manufacturePrice: {
      type: Number,
      required: true,
    },
    lot: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    inProgress: {
      type: Boolean,
      required: true,
    },
    isFinished: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Workorder = mongoose.model("Workorder", workorderSchema);

export default Workorder;

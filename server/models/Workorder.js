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
    description: {
      type: String,
    },
    rateOfYield: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "RateOfYield",
    },
    lot: {
      type: Number,
      required: true,
      unique: true,
    },
    workers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
      },
    ],
    totalPurchasePrice: {
      type: Number,
      required: true,
    },
    totalManufacturePrice: {
      type: Number,
      required: true,
    },
    toDo: {
      type: Boolean,
    },
    inProgress: {
      type: Boolean,
    },
    finished: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Workorder = mongoose.model("Workorder", workorderSchema);

export default Workorder;

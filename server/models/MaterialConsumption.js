import mongoose from "mongoose";
const materialConsumptionSchema = mongoose.Schema(
  {
    documentType: {
      type: String,
      required: true,
    },
    documentNumber: {
      type: Number,
      required: true,
      unique: true,
      min: 1,
    },
    workorder: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Workorder",
    },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Article",
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
  },
  {
    timestamps: true,
  }
);

const MaterialConsumption = mongoose.model(
  "MaterialConsumption",
  materialConsumptionSchema
);

export default MaterialConsumption;

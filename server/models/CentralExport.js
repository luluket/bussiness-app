import mongoose from "mongoose";
const centralExportSchema = mongoose.Schema(
  {
    destinationWarehouse: {
      type: String,
      required: true,
    },
    departureWarehouse: {
      type: String,
      required: true,
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
    exportedArticles: [
      {
        article: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Article",
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const CentralExport = mongoose.model("CentralExport", centralExportSchema);

export default CentralExport;

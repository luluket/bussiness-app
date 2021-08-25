import mongoose from "mongoose";
const centralImportSchema = mongoose.Schema(
  {
    departureWarehouse: {
      type: String,
      required: true,
    },
    destinationWarehouse: {
      type: String,
      required: true,
    },
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
    importedArticles: [
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
const CentralImport = mongoose.model("CentralImport", centralImportSchema);

export default CentralImport;

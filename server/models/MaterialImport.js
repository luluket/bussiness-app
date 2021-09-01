import mongoose from "mongoose";
const materialImportSchema = mongoose.Schema(
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
const MaterialImport = mongoose.model("MaterialImport", materialImportSchema);

export default MaterialImport;

/*
    Automatically created document when articles are exported from central warehouse
 */
import mongoose from "mongoose";
const materialImportSchema = mongoose.Schema(
  {
    warehouse: {
      type: String,
      required: true,
    },
    document: {
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
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        unit: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const MaterialImport = mongoose.model("MaterialImport", materialImportSchema);
export default MaterialImport;

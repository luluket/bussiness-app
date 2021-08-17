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

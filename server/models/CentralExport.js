import mongoose from "mongoose";
const centralExportSchema = mongoose.Schema(
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
    exportedArticles: [
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
const CentralExport = mongoose.model("CentralExport", centralExportSchema);
export default CentralExport;

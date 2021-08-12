/*LAGER LISTA
    id artikla
    naziv artikla
    jedinica mjere
    kolicina
    pnc
    cijena
*/
import mongoose from "mongoose";
const lagerSchema = mongoose.Schema({
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Article",
  },
  articleName: {
    type: mongoose.Schema.Types.String,
    required: true,
    ref: "Article",
  },
  quantity: {
    type: Number,
    required: true,
  },
  articleUnit: {
    type: mongoose.Schema.Types.String,
    required: true,
    ref: "Article",
  },
  averagePurchasePrice: {
    type: Number,
    required: true,
  },
  sellingPrice: {
    type: Number,
    required: true,
  },
});

const Lager = mongoose.model("Lager", lagerSchema);

export default Lager;
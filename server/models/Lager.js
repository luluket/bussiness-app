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
  article: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Article",
  },
  quantity: {
    type: Number,
    required: true,
  },
  accumulatedQuantity: {
    type: Number,
    required: true,
  },
  accumulatedPurchasePrice: {
    type: Number,
    required: true,
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

import mongoose from "mongoose";

const rateOfYieldSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Article",
  },
  components: [
    {
      material: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "MaterialLager",
      },
      factor: {
        type: Number,
        required: true,
      },
    },
  ],
});
const RateOfYield = mongoose.model("RateOfYield", rateOfYieldSchema);

export default RateOfYield;

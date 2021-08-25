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
        ref: "Article",
      },
      quantity: {
        type: Number,
        required: true,
      },
      factor: {
        type: Number,
      },
    },
  ],
});
const RateOfYield = mongoose.model("RateOfYield", rateOfYieldSchema);

export default RateOfYield;

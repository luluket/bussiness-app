import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const partnerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    oib: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

partnerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// before saving new user in db, hash the password
partnerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Partner = mongoose.model("Partner", partnerSchema);

export default Partner;

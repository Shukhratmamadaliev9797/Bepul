import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, requeired: true },
    lastName: { type: String, requeired: true },
    email: { type: String, requeired: true },
    phone: { type: String, requeired: true },
    address: { type: String, requeired: false },
    city: { type: String, requeired: false },
    postcode: { type: String, requeired: false },
    about: { type: String, requeired: false },
    image: { type: String, requeired: false },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;

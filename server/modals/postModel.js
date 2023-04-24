import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, requeired: true },
    image1: { type: String, requeired: true },
    image2: { type: String, requeired: true },
    image3: { type: String, requeired: false },
    image4: { type: String, requeired: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    poster: { type: String, required: true },
    urgent: { type: Boolean, requeired: true },
    category: { type: String, requeired: true },
    condition: { type: String, requeired: true },
    type: { type: String, requeired: true },
    contactNumber: { type: String, required: true },
    contactEmail: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postcode: { type: String, required: true },
    description: { type: String, required: true },
    lat: { type: Number, required: false },
    lng: { type: Number, required: false },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;

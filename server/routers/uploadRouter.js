import multer from "multer";
import express from "express";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import { isAuth } from "../utils.js";

const uploadRouter = express.Router();
dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

const uploadToCloudinary = (fileBuffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      {
        folder: process.env.CLOUDINARY_FOLDER || "bepul",
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );

    stream.end(fileBuffer);
  });

uploadRouter.post("/", isAuth, upload.single("image"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "No image file uploaded." });
    }

    const result = await uploadToCloudinary(req.file.buffer);
    return res.send(result.secure_url);
  } catch (error) {
    return next(error);
  }
});

// Backward compatibility for old frontend path.
uploadRouter.post(
  "/s3",
  isAuth,
  upload.single("image"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).send({ message: "No image file uploaded." });
      }

      const result = await uploadToCloudinary(req.file.buffer);
      return res.send(result.secure_url);
    } catch (error) {
      return next(error);
    }
  }
);

export default uploadRouter;

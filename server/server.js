import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import uploadRouter from "./routers/uploadRouter.js";
import postRouter from "./routers/postRouter.js";
import conversationRouter from "./routers/conversationRouter.js";
import messageRouter from "./routers/messageRouter.js";

dotenv.config({ path: path.resolve("../.env") });

//initiate express
const app = express();

//parsing incoming JSON requests
app.use(express.json());

//parsing string and array
app.use(express.urlencoded({ extended: true }));

//enabled access from different servers
app.use(cors());

//Connect mongodb
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/bepul", {});

//API routers
app.use("/api/users", userRouter);
app.use("/api/uploads", uploadRouter);
app.use("/api/posts", postRouter);
app.use("/api/conversations", conversationRouter);
app.use("/api/messages", messageRouter);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/client/build/index.html"))
);

//Error handling
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

//server port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`This server is running at ${port}`);
});

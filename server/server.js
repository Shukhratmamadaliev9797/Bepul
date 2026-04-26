import express from "express";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { Server } from "socket.io";
import userRouter from "./routers/userRouter.js";
import uploadRouter from "./routers/uploadRouter.js";
import postRouter from "./routers/postRouter.js";
import conversationRouter from "./routers/conversationRouter.js";
import messageRouter from "./routers/messageRouter.js";

dotenv.config({ path: path.resolve(".env") });

//initiate express
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || true,
  },
});

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

// Socket.IO
let users = [];

const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => users.find((user) => user.userId === userId);

io.on("connection", (socket) => {
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

//server port
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`This server is running at ${port}`);
});

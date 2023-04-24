import express from "express";
import expressAsyncHandler from "express-async-handler";
import Message from "../modals/Message.js";

const messageRouter = express.Router();

messageRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const newMessage = new Message({
      conversationId: req.body.conversationId,
      sender: req.body.sender,
      text: req.body.text,
    });

    try {
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
    } catch (error) {
      res.status(500).json(err);
    }
  })
);

messageRouter.get(
  "/:conversationId",
  expressAsyncHandler(async (req, res) => {
    try {
      const messages = await Message.find({
        conversationId: req.params.conversationId,
      });
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json(err);
    }
  })
);

export default messageRouter;

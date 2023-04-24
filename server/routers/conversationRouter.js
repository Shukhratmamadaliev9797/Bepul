import express from "express";
import expressAsyncHandler from "express-async-handler";
import Conversation from "../modals/Conversation.js";

const conversationRouter = express.Router();

conversationRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });
    try {
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } catch (error) {
      res.status(500).json(err);
    }
  })
);

conversationRouter.get(
  "/:userId",
  expressAsyncHandler(async (req, res) => {
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.userId] },
      });
      res.status(200).json(conversation);
    } catch (error) {
      res.status(500).json(err);
    }
  })
);

export default conversationRouter;

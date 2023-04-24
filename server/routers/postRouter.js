import express from "express";
import expressAsyncHandler from "express-async-handler";

import { isAuth } from "../utils.js";
import Post from "../modals/postModel.js";

const postRouter = express.Router();

postRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const pageSize = req.query.pageSize;
    const page = Number(req.query.pageNumber) || 1;

    const title = req.query.title || "";
    const titleFilter = title
      ? { title: { $regex: title, $options: "i" } }
      : {};

    const category = req.query.category || "";
    const categoryFilter = category ? { category: category } : {};

    const user = req.query.user || "";
    const userFilter = user ? { user: user } : {};

    const count = await Post.count({
      ...titleFilter,
      ...categoryFilter,
      ...userFilter,
    });

    const posts = await Post.find({
      ...titleFilter,
      ...categoryFilter,
      ...userFilter,
    })
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res.send({ posts, page, pages: Math.ceil(count / pageSize) });
  })
);

postRouter.get(
  "/theLatestPosts",
  expressAsyncHandler(async (req, res) => {
    const posts = await Post.find({});
    const latestPosts = posts.reverse().slice(0, 5);
    res.send(latestPosts);
  })
);

postRouter.get(
  "/UrgentPosts",
  expressAsyncHandler(async (req, res) => {
    const posts = (await Post.find({ urgent: true })).splice(0, 5);

    res.send(posts);
  })
);

postRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await Post.find({}).distinct("category");
    res.send(categories);
  })
);

postRouter.post(
  "/createPost",
  expressAsyncHandler(async (req, res) => {
    try {
      const post = new Post({
        user: req.body.userId,
        poster: req.body.poster,
        image1: req.body.image1,
        image2: req.body.image2,
        image3: req.body.image3,
        image4: req.body.image4,
        title: req.body.title,
        condition: req.body.condition,
        type: req.body.type,
        contactNumber: req.body.contactNumber,
        contactEmail: req.body.contactEmail,
        address: req.body.address,
        city: req.body.city,
        postcode: req.body.postcode,
        category: req.body.category,
        urgent: req.body.urgent,
        description: req.body.description,
        lat: req.body.lat,
        lng: req.body.lng,
      });

      const createdPost = await post.save();

      res.status(200).json({
        message: "New post created successfully",
        post: createdPost,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  })
);

postRouter.delete(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post) {
      const deletePost = await post.deleteOne();
      res.status(200).json({
        message: "Post Deleted Successfully",
        post: deletePost,
      });
    } else {
      res.status(404).json({ message: "Post Not Found" });
    }
  })
);

postRouter.put(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post) {
        post.image1 = req.body.image1;
        post.image2 = req.body.image2;
        post.image3 = req.body.image3;
        post.image4 = req.body.image4;
        post.title = req.body.title;
        post.condition = req.body.condition;
        post.type = req.body.type;
        post.address = req.body.address;
        post.city = req.body.city;
        post.postcode = req.body.postcode;
        post.contactNumber = req.body.contactNumber;
        post.contactEmail = req.body.contactEmail;
        post.category = req.body.category;
        post.urgent = req.body.urgent;
        post.description = req.body.description;
        post.lat = req.body.lat;
        post.lng = req.body.lng;

        await post.save();
        res.status(200).json({
          message: "Post Updated Successfully",
        });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

postRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.send(post);
    } else {
      res.status(404).send({ message: "Post Not Found" });
    }
  })
);

export default postRouter;

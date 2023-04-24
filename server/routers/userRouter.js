import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import data from "../data.js";
import { generateToken, isAuth, isAdmin } from "../utils.js";
import User from "../modals/userModel.js";

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await User.deleteMany({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          address: user.address,
          city: user.city,
          postcode: user.postcode,
          about: user.about,
          image: user.image,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      password: bcrypt.hashSync(req.body.password, 8),
      isAdmin: false,
    });
    const createdUser = await user.save();

    res.send({
      _id: createdUser._id,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      email: createdUser.email,
      phone: createdUser.phone,
      token: generateToken(createdUser),
    });
  })
);

userRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const firstName = req.query.firstName || "";
    const nameFilter = firstName
      ? { firstName: { $regex: firstName, $options: "i" } }
      : {};
    const users = await User.find({ ...nameFilter });
    res.send(users);
  })
);

userRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        const deleteUser = await user.deleteOne();
        res
          .status(200)
          .json({ message: "User Deleted Successfully", user: deleteUser });
      } else {
        res.status(404).json({ message: "User Not Found" });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  })
);

userRouter.put(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        user.address = req.body.address || user.address;

        const updatedUser = await user.save();
        res.status(200).json({
          message: "User Updated Successfully",
          user: updatedUser,
        });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  })
);
userRouter.put(
  "/profile/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.address = req.body.address || user.address;
      user.city = req.body.city || user.city;
      user.postcode = req.body.postcode || user.postcode;
      user.about = req.body.about || user.about;
      user.image = req.body.image || user.image;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedProfile = await user.save();
      res.send({
        _id: updatedProfile._id,
        firstName: updatedProfile.firstName,
        lastName: updatedProfile.lastName,
        email: updatedProfile.email,
        phone: updatedProfile.phone,
        address: updatedProfile.address,
        city: updatedProfile.city,
        postcode: updatedProfile.postcode,
        about: updatedProfile.about,
        image: updatedProfile.image,
        isAdmin: updatedProfile.isAdmin,
        token: generateToken(updatedProfile),
        message: "Profile Updated Successfully",
      });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

userRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);

export default userRouter;

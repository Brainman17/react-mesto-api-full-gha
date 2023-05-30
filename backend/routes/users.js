const express = require("express");
const userRouter = express.Router();
const {
  getUsers,
  getUser,
  getCurrentUser,
  updateUser,
  updateAvatar
} = require("../controllers/users");
const celebrates = require("../middlewares/celebrates");

userRouter.get("/users", getUsers);

userRouter.get("/users/me", getCurrentUser);

userRouter.get("/users/:userId", celebrates.getUser, getUser);

userRouter.patch("/users/me", celebrates.updateUser, updateUser);

userRouter.patch("/users/me/avatar", celebrates.updateAvatar, updateAvatar);

module.exports = { userRouter };

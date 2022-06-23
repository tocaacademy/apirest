const userController = require("../controllers/user.controller");
const express = require("express");
const { auth, isAdmin } = require("../middleware/auth");
const userRouter = express.Router();

userRouter.get("/", auth, isAdmin, userController.getUsers);
userRouter.post("/", userController.createUser);
userRouter.get("/:id", auth, userController.getUser);
userRouter.put("/:id", auth, userController.updateUser);
userRouter.delete("/:id", auth, userController.deleteUser);
userRouter.post("/login", userController.loginUser);

module.exports = userRouter;

const userController = require("../controllers/user.controller");
const express = require("express");
const userRouter = express.Router();

userRouter.get("/", userController.getUsers);
userRouter.post("/", userController.createUser);
userRouter.get("/:id", userController.getUser);
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);
userRouter.post("/login", userController.loginUser);

module.exports = userRouter;

const express = require("express");
const app = express();
const userRouter = require("./routes/user.routes");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/user", userRouter);

module.exports = app;

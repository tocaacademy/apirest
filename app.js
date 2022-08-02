const express = require("express");
const app = express();
const userRouter = require("./routes/user.routes");
const fetchRouter = require("./routes/fetch.routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./documentation/swagger-docs.json");

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/user", userRouter);
app.use("/fetch", fetchRouter);

module.exports = app;

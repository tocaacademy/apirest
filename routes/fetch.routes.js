const express = require("express");
const fetchUser = require("../controllers/fetch.controller");
const fetchRouter = express.Router();

fetchRouter.get("/", fetchUser);

module.exports = fetchRouter;

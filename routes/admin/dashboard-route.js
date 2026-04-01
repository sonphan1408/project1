const express = require("express");
const route = express.Router();
const controller = require("../../controllers/admin/dashboard-controllere");
route.use("/",controller.dashboard);
module.exports = route;

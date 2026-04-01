const multer  = require('multer');
const express = require("express");
const storageMulter = require("../../helpers/strorageMulter");
const authController = require("../../controllers/admin/auth-controller")
const uploadClound = require("../../middleware/admin/cloud-middleware");
const route = express.Router();
const upload = multer();


route.get("/login",authController.login);
route.post("/login",authController.loginPost)

module.exports = route; 
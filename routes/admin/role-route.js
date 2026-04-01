
const multer  = require('multer');
const express = require("express");
const storageMulter = require("../../helpers/strorageMulter");
const roleController = require("../../controllers/admin/role-controller")
const uploadClound = require("../../middleware/admin/cloud-middleware");
const route = express.Router();
const upload = multer();

const validate = require("../../validate/admin/product-validate");



route.get("/",roleController.index);

route.get("/create",roleController.create);
route.post("/create",roleController.createPost)
route.get("/permissions",roleController.permission);
route.patch("/permissions",roleController.permissionPatch);
module.exports = route; 

const multer  = require('multer');
const express = require("express");
const storageMulter = require("../../helpers/strorageMulter");
const productCategoryController = require("../../controllers/admin/products-category-controller")
const uploadClound = require("../../middleware/admin/cloud-middleware");
const route = express.Router();
const upload = multer();

const validate = require("../../validate/admin/product-validate");



route.get("/",productCategoryController.index);

route.get("/create",productCategoryController.create);
route.post("/create",upload.single('thumbnail'),
uploadClound.uploadClound,
productCategoryController.createPost)
module.exports = route;
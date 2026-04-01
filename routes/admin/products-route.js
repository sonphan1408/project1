const productController = require("../../controllers/admin/products-controller");
const multer  = require('multer');
const storageMulter = require("../../helpers/strorageMulter");
const cloudinary = require('cloudinary').v2;

const streamifier = require('streamifier');
const express = require("express");
const uploadClound = require("../../middleware/admin/cloud-middleware");
const route = express.Router();
const upload = multer();

const validate = require("../../validate/admin/product-validate");

 // Configuration
 


route.get("/",productController.product);
route.patch("/change-status/:status/:id",productController.changeStatus);
route.delete("/delete/:id",productController.deleteItem);
route.patch("/change-multi",productController.changeMulti);
route.get("/create",productController.create);
route.post("/create",upload.single('thumbnail'),
uploadClound.uploadClound,
validate.createPost,
productController.createPost)
route.get("/edit/:id",productController.edit);
route.patch("/edit/:id",upload.single('thumbnail'),
validate.createPost,
productController.editPatch)
module.exports = route;
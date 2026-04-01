const multer = require('multer');
const express = require("express");
const storageMulter = require("../../helpers/strorageMulter");
const accountController = require("../../controllers/admin/account-controller")
const uploadClound = require("../../middleware/admin/cloud-middleware");
const accountValidate = require("../../validate/admin/account-validate");
const route = express.Router();
const upload = multer();

const validate = require("../../validate/admin/product-validate");



route.get("/", accountController.index);

route.get("/create", accountController.create);
route.post("/create",
    upload.single('avatar'),
    uploadClound.uploadClound,
    accountValidate.createPost,
    accountController.createPost);
route.get("/edit/:id", accountController.edit);
route.patch("/edit/:id",
    upload.single('avatar'),
    uploadClound.uploadClound,
    accountValidate.editPatch,
    accountController.editPatch);

module.exports = route; 
const mongoose = require("mongoose");
const express = require("express")
require('dotenv').config();
module.exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("Connect Success!");
  } catch (error) {
    console.log("Connect Error!",error);
  }
};
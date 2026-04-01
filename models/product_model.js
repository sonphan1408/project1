const mongoose = require("mongoose");
const slugUpdater = require('mongoose-slug-updater');


mongoose.plugin(slugUpdater);

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  category_id: String,
  price: Number,
  discountPercentage: Number,   
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  deleted: {
   type: Boolean,
   default: false
  },
  createdBy: {
    account_id: String,
    createdAt:{
      type: Date,
      default: Date.now

    } 
  },
  deletedBy: {
    account_id: String,
    deletedAt: Date
  },
  updatedBy:[{
    account_id: String,
    updatedAt: Date
  }], 

  slug: { 
    type: String,
    slug: "title",
    unique: true }
},{
  timestamps: true

  
});
const Product = mongoose.model("Product",productSchema,"Product");
module.exports = Product;
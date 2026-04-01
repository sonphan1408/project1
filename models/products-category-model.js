const mongoose = require("mongoose");
const slugUpdater = require('mongoose-slug-updater');


mongoose.plugin(slugUpdater);
const productsCategorySchema = new mongoose.Schema({
  title: String,
  parent_id: String,
  description: String,
  thumbnail: String,
  status: String,
  position: Number,
  deleted: {
   type: Boolean,
   default: false
  },

  deletedAt: Date,
  slug: { 
    type: String,
    slug: "title",
    unique: true }

},{
  timestamps: true

  
});
const productsCategory = mongoose.model("productsCategory",productsCategorySchema,"Products-category");
module.exports = productsCategory;
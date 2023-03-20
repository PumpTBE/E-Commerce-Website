const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String },
  price: { type: Number },
  numInStock: { type: Number },
  image: { type: String },
  description: { type: String },
  category: {type: Object, ref: "Category"}
});

const product = mongoose.model("Product", productSchema);
module.exports = product;

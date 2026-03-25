const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName:String,
  price:String,
  description:String,
  image:String,
  stock:Number,
  createdAt:Date
  
})
module.exports = mongoose.model('product',productSchema);
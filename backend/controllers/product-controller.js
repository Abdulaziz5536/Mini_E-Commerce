const express = require('express');
const Product = require('../models/product-model');



const addProduct = async (req,res) => {
  const {productName,price,description,image,stock} = req.body;
  
    if (!productName || !price || !image) {
    return res.status(400).json({ error: "Product name, price, and image are required" });
  }

  try {
    const product = await Product.create({
      productName,
      price,
      description,
      image,
      stock
    })
    res.json({message:"product added",product});
    
  } catch (error) {
    res.status(500).json({error});
    
  }


 
}

const listProduct = async (req,res) => {
   try {
    const products = await Product.find();
    res.json(products);

    
  } catch (error) {
    console.log(error);
    res.status(500).json({error});
    
  }

}
const listSingleProduct = async (req,res) => {
  try {
    const product = await Product.findById(req.params.id);

    if(product){
      res.json(product);
    }else{
      res.status(400).json({error:"product not found"})
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({error})
  }

}

const removeProduct = async (req,res) => {

   try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {addProduct,listProduct,listSingleProduct,removeProduct};
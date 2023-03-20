const express = require ("express");
const { default: mongoose } = require("mongoose");
const Product = require("../models/productModel")
const productRouter = express.Router();
const {isValidObjectId} = require("mongoose");

productRouter.post("/", async (req, res) =>{
  // create a new product
const newProduct = new Product(req.body);
const product = await newProduct.save();
if(product){
  res.send({success : "Product saved successfully"})
}else{
  res.send({error : "Error saving new product"})
}
})

////GET ALL PRODUCT
productRouter.get("/", async(req, res) =>{
  const product = await Product.find();
  res.send(product);
})

// DELETE A SINGLE PRODUCT

//DELETE A SINGLE PRODUCT
productRouter.delete("/:id", async(req, res)=>{
  const id = req.params.id;
  if(!isValidObjectId(id)){
      res.send({error : "The ID of the product is invalid"});
      return;
     }
  const deleteProduct = await Product.findByIdAndDelete(id);

  if(deleteProduct){
      res.send({success : "Product Deleted Successfully"})
  }else{
      res.send({error : "Error Deleting Product"})
  }

} )

////// GET A SINGLE PRODUCT ROUTE 
productRouter.get("/:id", async (req, res)=>{
  const id = req.params.id
  if(!isValidObjectId(id)){
    res.send({error : "The ID of the product is invalid"});
    return;
  }
  const product = await Product.findById(id);
  res.send(product);
});

///// UPDATE A SINGLE PRODUCT ROUTE
productRouter.put("/:id",async(req, res) =>{
  const id = req.params.id;
  if(!isValidObjectId(id)){
    res.send({error : "The ID of the product is invalid"});
    return;
  }

  //Get the product you wish to update
  const product = await Product.findById(id);
  //Update the product information 
  if(!product){
    res.send({ error: "The product is not found"});
    return;
  }
 
  product.title = req.body.title || product.title;
  product.price = req.body.price || product.price;
  product.image = req.body.image || product.image;
  product.category = req.body.category || product.category;
  product.description = req.body.description || product.description;
  //Save new product information
  const updatedProduct =  await product.save();
  if(updatedProduct){
    res.send({success: "Product updated successfully"})
  }else{
    res.send({error: "Error updating product"})
  }
})

module.exports = productRouter;
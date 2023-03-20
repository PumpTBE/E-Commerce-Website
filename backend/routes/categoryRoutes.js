const express = require ("express");
const categoryRouter = express.Router();
const {isValidObjectId} = require("mongoose");
const Category = require("../models/categoryModel");


//// POST A CATEGORY
categoryRouter.post("/", async (req, res) =>{
  // create a new CATEGORY

const newCategory = new Category(req.body);
const category = await newCategory.save();

if(category){
  res.send({success : "Product saved successfully"})
}else{
  res.send({error : "Error saving new product"})
}
})

////GET ALL CATEGORY
categoryRouter.get("/", async(req, res) =>{
  const category = await Category.find();
  res.send(category);
})

//DELETE A SINGLE PRODUCT
categoryRouter.delete("/:id", async(req, res)=>{
  const id = req.params.id;
  if(!isValidObjectId(id)){
      res.send({error : "This Category is invalid"});
      return;
     }
  const deleteCategory = await Category.findByIdAndDelete(id);

  if(deleteCategory){
      res.send({success : "Product Deleted Successfully"})
  }else{
      res.send({error : "Error Deleting Product"})
  }

} )

////// GET A SINGLE PRODUCT ROUTE 
categoryRouter.get("/:id", async (req, res)=>{
  const id = req.params.id
  if(!isValidObjectId(id)){
    res.send({error : "The ID of the product is invalid"});
    return;
  }
  const deleteCategory = await Category.findByIdAndDelete(id);
  
  if (deleteCategory) {
    res.send({success : "Category Deleted Successfully"})
  } else{
    res.send({success : "Error Deleting Product Category"})
  }
});


module.exports = categoryRouter;
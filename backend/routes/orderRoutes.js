const express = require("express");
const { isValidObjectId } = require("mongoose");
const Order = require("../models/orderModel");


const orderRouter = express.Router();

orderRouter.post ("/", async(req, res) =>{
let orderItems = req.body.orderItems;
let totalPrice = orderItems.reduce((a,c) => a + c.price * c.qty, 0);

  const newOrder = new Order ({
    user :req.body.user,
    orderItems : req.body.orderItems,
    deliveryInfo : req.body.deliveryInfo,
    totalPrice : totalPrice
  });

 const order = await newOrder.save();
 if (order){
  res.send ({success: "Order saved Successfully"});
 }else{
  res.send({error: "Error Saving Order"});
 }
});

orderRouter.get("/", async(req, res) =>{
  const orders = await Order.find().populate("user");
  res.send(orders); 
})

orderRouter.delete("/:id", async(req, res)=>{
  const id = req.params.id;
  
  const deleteOrder = await Order.findByIdAndDelete(id);

  if(deleteOrder){
    res.send({success: "Order Deleted Successfully"})
  }else{
    res.send ({error: "Error Deleting Order"})
  }
})

orderRouter.get("/:id", async (req, res)=>{
  const id = req.params.id
  if(!isValidObjectId(id)){
    res.send({error : "The ID of the order is invalid"});
    return;
  }
  const order = await Order.findById(id).populate("user");
  res.send(order);
  // console.log(order);
});



///// UPDATE A SINGLE ORDER ROUTE
orderRouter.put("/:id",async(req, res) =>{
 
  const id = req.params.id;
  if(!isValidObjectId(id)){
    res.send({error : "The ID of the order is invalid"});
    return;
  }

  //Get the status you wish to update
  const order = await Order.findById(id);
  //Check if the order exits
  if(!order){
    res.send({ error: "The order is not found"});
    return;
  }
 
  order.status = req.body.status || order.status;
  
  //Save new order information
  const updatedOrder =  await order.save();
  if(updatedOrder){
    res.send({success: "Order updated successfully"})
  }else{
    res.send({error: "Order updating order"})
  }

});


module.exports = orderRouter;
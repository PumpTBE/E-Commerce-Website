const express = require("express");
const User = require ("../models/userModel");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  //Check and return if the email already exits
  const existingEmail = await User.findOne({ email: req.body.email }); //e.g {email : "des@gmail.com"}
  if (existingEmail) {
    res.send({ error: "This email is already in use" });
    return;
  }
  //Create a user
  const newUser = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,

  });
  //Save the user
  const user = await newUser.save();
  //Check if user is saved successfully
  if (user) {
    res.send({ success: "User Saved Successfully" });
  } else {
    res.send({ error: "Error Saving New User" });
  }
});

userRouter.post("/login", async (req, res) => {
  //Check if the email exists and return if it does not
  const existingUser = await User.findOne({ email: req.body.email });
  if (!existingUser) {
    res.send({ error: "There is n0 user with this email" });
    return;
  }

  //Check if the password supplied matches with the existing users password
  if (req.body.password !== existingUser.password) {
    res.send({ error: "The password is incorrect" });
    return;
  }
  //Send a success message to the users information
  res.send({ success: "Login Sucessful", user: existingUser });
});


module.exports = userRouter
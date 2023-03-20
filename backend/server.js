const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); //Cross Origin Resource Sharing

const User = require("./models/userModel");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const app = express(); // initializing the node-express app
const orderRouter = require("./routes/orderRoutes");
const categoryRouter = require("./routes/categoryRoutes");





app.use(cors());
app.use(express.json());

//get,post,put,delete

app.get("/", (request, response) => {
  response.send("This is the new node server");
});

/////// ROUTES CONNECTION
app.use("/api/users",userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/category", categoryRouter);


//Create a database connection
mongoose
  .connect(
    "mongodb+srv://mernclass:mernclasspassword@cluster0.rbjlfjv.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((res) => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
// Create a listener to run the server

app.listen(5000, () => {
  console.log("Listening on port 5000");
});

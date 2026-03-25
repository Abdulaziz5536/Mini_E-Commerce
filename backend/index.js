require("dotenv").config();
const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const connectDB = require('./config/mongodb');
const productRoute = require('./routes/product-route');
const authRoute = require('./routes/auth-route');
const cors = require('cors');
app.use(cors());

const port = process.env.PORT;
connectDB();

app.use(authRoute);

app.use('/product',productRoute);




app.listen(port, () => {
  console.log("server is listening at port "+port);
  
})




module.exports = app;
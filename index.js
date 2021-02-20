const express = require("express");
var bodyParser = require("body-parser");
var cors = require('cors')
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

// connect to db
mongoose.connect(
  process.env.CONNECT_DB,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("connected to db")
);


// Middlewares
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", true)
 res.setHeader("Access-Control-Allow-Origin", "*") 
 res.setHeader("Access-Control-Allow-Methods", 'GET, POST, PATCH, DELETE, PUT, OPTIONS')
 res.setHeader("access-control-allow-headers", "Content-Type") 
 res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With" )
 next()}
 )
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());

// route Middlewares
app.use("/api", require("./routes/listing"));

app.listen(4000, () => console.log("server up and runing on port 4000!"));

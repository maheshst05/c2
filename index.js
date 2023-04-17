const express = require("express");
const app = express();
app.use(express.json());
const { connection } = require("./db");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const mongoose = require("mongoose");
const{ProdRotes} =  require("./routes/prodRoutes")
const { userRoutes } = require("./routes/userRouts");
app.use("/user",userRoutes)
app.use("/",ProdRotes)
app.listen(9090, async () => {
  try {
    await connection;

    console.log("connet to the db");

    console.log("server is runing..");
  } catch (error) {
    console.log(error.message);
  }
});

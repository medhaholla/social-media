const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const dotenv = require("dotenv");
const morgan = require("morgan");
require("dotenv").config();
const appRoute = require("./router/user.js");

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
    // Your code after successful connection
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToDatabase();

const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.listen(PORT, () => {
  console.log("sever started");
});

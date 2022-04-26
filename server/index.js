// const express = require("express");
import express from "express";

// const mongoose = require("mongoose");
import mongoose from "mongoose";
// const dotenv = require("dotenv");
import dotenv from "dotenv";
// const helmet = require("helmet");
import helmet from "helmet";
// const morgan = require("morgan");
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 8800;
dotenv.config();

// mongoose.connect(
//   process.env.MONGO_URL,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   () => {
//     console.log("Connected to MongoDB");
//   }
// );

app.listen(port, () => {
  console.log(
    "Backend server is running on port 8800"
  );
});

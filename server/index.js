const express = require("express");
const app = express();
const port = 8800;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
import bodyParser from "body-parser";
import cors from "cors";

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

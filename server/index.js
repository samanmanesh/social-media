import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 8800;
//for using dotenv
dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to MongoDB");
  }
);
//middlewares

app.use(express.json()); // 
app.use(helmet());
app.use(morgan("common"));
app.use(cors());
// app.use(bodyParser.json({ limit: "30mb", extended: true })); // it seems for new version of express dont need this
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // it seems for new version of express dont need this



app.listen(port, () => {
  console.log(
    "Backend server is running on port 8800"
  );
});

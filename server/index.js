import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/users.js";
import authRoute from "./routes/auth.js";

const app = express();
const port = process.env.port || 8800;
//for using dotenv
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
//middlewares

app.use(express.json()); //
// app.use(bodyParser.json({ limit: "30mb", extended: true })); // it seems for new version of express dont need this
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // it seems for new version of express dont need this
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Hello Social Media");
});


app.listen(port, () => {
  console.log(
    "Backend server is running on port 8800"
  );
});

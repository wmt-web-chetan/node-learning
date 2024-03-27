import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
const app = express();

dotenv.config();
connectDB()





const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("port is running");
});

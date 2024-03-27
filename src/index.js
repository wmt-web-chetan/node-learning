import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
import { app } from "./app.js";
// To load environment variables from a .env file into process.env
dotenv.config();

// Connect to MongoDB and start the Express server
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("port is running");
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error==>>>", err);
  });

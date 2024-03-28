import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "26kb" })); // limit the body of the request to 26kb
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static("public")); // Serve static files from the public directory
app.use(cookieParser()); // to access cookies in server from browser


//Routes

import  userRouter  from "./routes/user.route.js";


// route declearation
app.use("/user",userRouter)

export { app };

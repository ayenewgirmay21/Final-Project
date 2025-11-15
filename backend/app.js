import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";

import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";

const app = express();
config({ path: "./config/config.env" });

// ---------------------------------------
//  FIXED CORS for Render + Vercel
// ---------------------------------------
app.use(
  cors({
    origin: [
      "https://final-project-livid-mu.vercel.app",   // Your frontend
      "https://final-project-admin.vercel.app"       // Admin dashboard
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

// Fix OPTIONS preflight for login/register (VERY IMPORTANT!)
app.options("*", cors());

// ---------------------------------------
//  Body Parsers
// ---------------------------------------
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------------------------------
//  File Upload (Cloudinary)
// ---------------------------------------
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// ---------------------------------------
//  Routes
// ---------------------------------------
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

// ---------------------------------------
//  Database connection
// ---------------------------------------
dbConnection();

// ---------------------------------------
//  Error Middleware
// ---------------------------------------
app.use(errorMiddleware);

export default app;

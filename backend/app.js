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

// Load environment variables
config({ path: "./config/config.env" });

// CORS setup
app.use(
  cors({
    origin: [
      "https://mediserve-dashboard-final-project.vercel.app",
      "https://mediserve-frontend-final-project.vercel.app",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Allow preflight OPTIONS request
app.options("*", cors());

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

// Test route
app.get("/api/v1/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is working!",
  });
});

// Database connection
dbConnection();

// Error middleware (must be last)
app.use(errorMiddleware);

export default app;

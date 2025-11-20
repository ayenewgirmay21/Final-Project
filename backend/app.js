
import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import cookieParser from "cookie-parser";
import {config} from "dotenv"
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
const app = express();
config({path: "./config/config.env" });
app.use(
  cors({
    origin: [
      "https://mediserve-frontend-final-project.vercel.app",
      "https://mediserve-dashboard-final-project.vercel.app",
      process.env.FRONTEND_URL_ONE,
      process.env.FRONTEND_URL_TWO
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);
// Required for preflight requests
app.options("*", cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

app.get("/api/v1/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is working!",
  });
});

dbConnection();

app.use(errorMiddleware);
export default app;

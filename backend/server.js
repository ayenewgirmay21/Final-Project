import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

import express from "express";
import app from "./app.js";
import cors from "cors";
import cloudinary from "cloudinary";

// -----------------------------
//  CLOUDINARY CONFIG
// -----------------------------
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// -----------------------------
//  CORS FIX FOR RENDER + VERCEL
// -----------------------------
app.use(
  cors({
    origin: [
      "https://final-project-livid-mu.vercel.app",     // frontend
      "https://final-project-admin.vercel.app",        // admin dashboard
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

// Important for OPTIONS preflight (fixes login/register issue)
app.options("*", cors());

// -----------------------------
//  START SERVER
// -----------------------------
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});

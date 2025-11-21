import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

// Helper to verify JWT and get user
const verifyToken = async (token, res, next) => {
  if (!token) {
    return next(new ErrorHandler("Authentication token is missing!", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new ErrorHandler("User not found!", 404));
    }
    return user;
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired token!", 401));
  }
};

// Middleware to authenticate dashboard users (Admin)
export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.adminToken;
  const user = await verifyToken(token, res, next);
  if (!user) return; // stops if error handled in verifyToken

  if (user.role !== "Admin") {
    return next(
      new ErrorHandler(`${user.role} not authorized for dashboard access!`, 403)
    );
  }

  req.user = user;
  next();
});

// Middleware to authenticate frontend users (Patient)
export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.patientToken;
  const user = await verifyToken(token, res, next);
  if (!user) return;

  if (user.role !== "Patient") {
    return next(
      new ErrorHandler(`${user.role} not authorized for this resource!`, 403)
    );
  }

  req.user = user;
  next();
});

// Middleware for role-based authorization
export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ErrorHandler("User not authenticated!", 401));
    }
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} not allowed to access this resource!`,
          403
        )
      );
    }
    next();
  };
};

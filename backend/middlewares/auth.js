import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

// Helper function to verify token
const verifyToken = (token) => {
if (!token) throw new Error("No token provided");
return jwt.verify(token, process.env.JWT_SECRET);
};

// Admin authentication middleware
export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
try {
const token = req.cookies?.adminToken;
if (!token) {
return next(new ErrorHandler("Dashboard User is not authenticated!", 401));
}

```
const decoded = verifyToken(token);
const user = await User.findById(decoded.id);

if (!user || user.role !== "Admin") {
  return next(new ErrorHandler("Not authorized for this resource!", 403));
}

req.user = user;
next();
```

} catch (err) {
console.error("Admin auth error:", err.message);
return next(new ErrorHandler("Invalid or expired token", 401));
}
});

// Patient authentication middleware
export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
try {
const token = req.cookies?.patientToken;
if (!token) {
return next(new ErrorHandler("User is not authenticated!", 401));
}

```
const decoded = verifyToken(token);
const user = await User.findById(decoded.id);

if (!user || user.role !== "Patient") {
  return next(new ErrorHandler("Not authorized for this resource!", 403));
}

req.user = user;
next();
```

} catch (err) {
console.error("Patient auth error:", err.message);
return next(new ErrorHandler("Invalid or expired token", 401));
}
});

// Role-based authorization
export const isAuthorized = (...roles) => (req, res, next) => {
if (!req.user) {
return next(new ErrorHandler("User not authenticated", 401));
}

if (!roles.includes(req.user.role)) {
return next(
new ErrorHandler(`${req.user.role} not allowed to access this resource!`, 403)
);
}
next();
};

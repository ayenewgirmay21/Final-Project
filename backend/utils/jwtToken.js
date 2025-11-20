/* utils/jwtToken.js */
import jwt from "jsonwebtoken";

export const generateToken = (user, message, statusCode, res) => {
  // Create JWT token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || "7d" }
  );

  // Determine cookie name based on role
  const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";

  // Detect production
  const isProduction = process.env.NODE_ENV === "production";

  // Send token in HTTP-only, secure cookie
  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: isProduction,           // secure only in production
      sameSite: isProduction ? "none" : "lax", // cross-site cookies in prod
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};

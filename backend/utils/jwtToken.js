/* utils/jwtToken.js */
import jwt from "jsonwebtoken";

export const generateToken = (user, message, statusCode, res) => {
// Create JWT token
const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
expiresIn: process.env.JWT_EXPIRES || "7d",
});

// Determine cookie name based on role
const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";

// Send token in HTTP-only, secure cookie
res
.status(statusCode)
.cookie(cookieName, token, {
expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
httpOnly: true,
secure: true,          // required for HTTPS
sameSite: "none",      // allow cross-site cookie
})
.json({
success: true,
message,
user,
token,
});
};
